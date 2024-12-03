const fs = require('fs');
const input = fs.readFileSync('./Day3/input', {encoding: 'utf8'});

// mul(159,685)
const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/gi;
const matches = input.matchAll(regex);

let sum = 0;
for (let match of matches) {
    console.log(match[0]);
    let justInts = match[0].replace('mul(', '').replace(')', '');

    let int1 = Number(justInts.split(',')[0]);
    let int2 = Number(justInts.split(',')[1]);

    sum += (int1 * int2);
}

console.log(sum);