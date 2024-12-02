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
  let file = await parseData('test.txt');
  // console.log(file);
  const lines = file.trim().split('\n');
  const arrays = lines.map(line => line.split(' ').map(Number));
  arrays.forEach(safetyCheck);
}

function safetyCheck(line){
  let i = -1;
  // console.log(line)
  let gradient = (line[0] > line[1]) ? -1 : 1;
  console.log("gradient: ", gradient);
  while(++i < line.length){
    // console.log(i, line[i]);
  }
}
safeReport();