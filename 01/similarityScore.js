const fs = require('fs');

console.log(countSimilarityScore());

function countSimilarityScore(){
    let similarityScore = 0;
    let leftList = []; let rightList = [];
    parseFile(leftList, rightList);
    for (const index in leftList){
        let similarity = getSimilarity(leftList[index], rightList);
        similarityScore += similarity;
    }
    return similarityScore;
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

function getSimilarity(n, list){
    nOccurrence = 0;
    list.forEach(((value)=>{
        if (value == n)
            nOccurrence++;
    }))
    let similarity = n * nOccurrence;
    return similarity;
}
function calcDifference(n1, n2){
    return ((n1 > n2) ? (n1 - n2) : (n2 - n1));
}