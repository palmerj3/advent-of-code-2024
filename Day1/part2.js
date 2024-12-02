const fs = require('fs');
const input = fs.readFileSync('./input', {encoding: 'utf8'});

let arr1 = [];
let rightListLookup = {};
let totalDistance = 0;

input.split('\n').forEach((line) => {
    let nums = line.split(' ');

    arr1.push(nums[0]);
    
    if(!rightListLookup.hasOwnProperty(nums[3])) {
        rightListLookup[nums[3]] = 0;
    }
    rightListLookup[nums[3]]++;
});

for(let i = 0; i < arr1.length; i++) {
    let num1 = arr1[i];

    let numOccurrences = rightListLookup[num1] ? rightListLookup[num1] : 0;
    
    totalDistance += (num1 * numOccurrences);
}

console.log('Total Distance: ', totalDistance);