const fs = require('fs');

console.log(highestDifference());

function highestDifference(){
    let totalDistance = 0;
    let leftList = []; let rightList = [];
    parseFile(leftList, rightList);
    leftList.sort();
    rightList.sort();
    for (const index in leftList){
        totalDistance += calcDifference(leftList[index], rightList[index]);
    }
    return totalDistance;
}

function parseFile(leftList, rightList){
    let data;
    try {
        data = fs.readFileSync('input.txt', 'utf8');
    } catch (err) {
        console.error('Error reading the file:', err);
    }
    
    let file = data.trim().split('\n');
    file.forEach(((line, index)=>{
        pair = line.trim().split(/\s+/);
        leftList.push(pair[0]);
        rightList.push(pair[1]);
    }))
}
function calcDifference(n1, n2){
    return ((n1 > n2) ? (n1 - n2) : (n2 - n1));
}