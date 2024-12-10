const fs = require('fs');
//const input = fs.readFileSync('./Day9/inputSample', {encoding: 'utf8'});
const input = fs.readFileSync('./Day9/input', {encoding: 'utf8'});

let fileOrFreeSpace = 0;
let idIncrement = 0;
numInts = 0;
numSpaces = 0;

let parts = [];
input.split('').forEach((block) => {
    let num = parseInt(block, 10);

    if (fileOrFreeSpace === 0) {
        for (let i = 0; i < num; i++) {
            parts.push(idIncrement);
            numInts++;
        }
        idIncrement++;
        fileOrFreeSpace = 1;
    } else {
        for (let i = 0; i < num; i++) {
            parts.push('.');
            numSpaces++;
        }
        fileOrFreeSpace = 0;
    }
});


fs.writeFileSync('./Day9/intermediaryInput', parts.join(''));
// console.log('***** Original *****');
// console.log(outputStr);
// console.log('');

for (let i = 0; i < parts.length; i++) {
    // Go until we find a free space
    if (parts[i] === '.') {
        // Reverse search for non-space (number)
        for (let x = parts.length-1; x > i; x--) {
            if (parts[x] !== '.' && parts[i] === '.') {
                parts[i] = parts[x];
                parts[x] = '.';
                break;
            }
        }

        //console.log(parts.join(''));
    }
}

// Calculate checksum
let checkSum = 0;
for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '.') {
        //console.log(`${checkSum} += (${i} * ${parts[i]})`);
        checkSum += (i * parts[i]);
    } else {
        break;
    }
}

console.log(parts.join(''));
console.log('Checksum: ', checkSum);