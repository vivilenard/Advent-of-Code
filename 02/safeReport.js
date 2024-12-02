const fs = require('fs/promises');

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
    if (safetyCheck(line) == 1)
      safeReports++;
});
  console.log(safeReports);
}

function safetyCheck(line){
  const safetyLevel = 3;
  let i = -1;
  let gradient = (line[0] > line[1]) ? -1 : 1;
  while(++i < line.length - 1){
    let diff = (line[i + 1] - line[i]) * gradient;
    if (diff > 0 && diff <= safetyLevel)
      continue;
    else
      return -1;
  }
  return 1;
}

safeReport();