const fs = require('fs');
const input = fs.readFileSync('./input', {encoding: 'utf8'});

let arr1 = [];
let arr2 = [];
let totalDistance = 0;

input.split('\n').forEach((line) => {
    let nums = line.split(' ');

    arr1.push(nums[0]);
    arr2.push(nums[3]);
});

arr1.sort();
arr2.sort();

for(let i = 0; i < arr1.length; i++) {
    let num1 = arr1[i];
    let num2 = arr2[i];

    totalDistance += Math.max(num1, num2) - Math.min(num1, num2);
}

console.log('Total Distance: ', totalDistance);