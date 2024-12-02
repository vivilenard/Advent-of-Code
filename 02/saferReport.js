const fs = require('fs/promises');

const safetyLevel = 3;
let allowedJumps = 1;

async function parseData(fileName){
  let data;
  try{
    data = await fs.readFile(fileName, { encoding: 'utf8' });
  }
  catch(err){
    console.log(err);
  }
  return data;
}

async function safeReport() {
  let file = await parseData('test2.txt');
  let safeReports = 0;
  const lines = file.trim().split('\n');
  const arrays = lines.map(line => line.split(' ').map(Number));
  arrays.forEach((line) => {
    console.log('--------')
    console.log(line)
    if (safetyCheck(line, -1) == true)
    {
      safeReports++;
      console.log('\x1b[32m%s\x1b[0m', "yes")
    }
    else if (safetyCheck(line, 1) == true)
    {
      safeReports++;
      console.log('\x1b[32m%s\x1b[0m', "yes")
    }
    else
      console.log('\x1b[35m%s\x1b[0m', "no")
    
});
  console.log('total Safetys:' , safeReports);
}

function safetyCheck(line, gradient){
  let i = -1;
  let availableJumps = allowedJumps;
  while(++i < line.length - 1){
    // console.log('n: ', line[i]);
    if (!isSafe(line[i], line[i + 1], gradient))
    {
      if (!availableJumps) return -1;
      else if(line[i + 2] && isSafe(line[i], line[i + 2], gradient)){
        availableJumps--;
        console.log("removing level: ", i);
        // console.log("")
        i++;
      }
      else if (i == 0) //disregard first or last one
      {
        availableJumps--;
        console.log("removing level: ", i);
      }
      else if (!(line[i + 2]))  //disregard first or last one
      {
        availableJumps--;
        console.log("removing level: ", i + 1);
        i++;
      }
      else 
        return -1
      // console.log("available jumps" , availableJumps);
    }
  }
  console.log("available jumps: ", availableJumps);
  return 1;
}

function isSafe(n1, n2, gradient){
  let diff = (n2 - n1) * gradient;
  return (diff > 0 && diff <= safetyLevel)
}
safeReport();