const fs = require('fs');
const input = fs.readFileSync('./Day3/input', {encoding: 'utf8'});

// mul(159,685)
const regex = /\bmul\(\d{1,3},\s?\d{1,3}\)|\bdo\(\)|\bdon't\(\)/g;
const matches = input.matchAll(regex);

let sum = 0;
let isMultiplying = true;

for (let match of matches) {
    console.log(match[0]);
    
    if (match[0].startsWith('mul(')) {
        if (isMultiplying === true) {
            let justInts = match[0].replace('mul(', '').replace(')', '');

            let int1 = Number(justInts.split(',')[0]);
            let int2 = Number(justInts.split(',')[1]);
        
            sum += (int1 * int2);
        }
    } else if (match[0].startsWith('do()')) {
        isMultiplying = true;
    } else if (match[0].startsWith('don')) {
        isMultiplying = false;
    }
}

console.log(sum);