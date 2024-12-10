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
// console.log(parts.join(''));
// console.log('');

for(let i = parts.length-1; i > 0; i--) {
    let char = parts[i];

    if(char === '.') continue;

    let endIndex = i;
    let startIndex = i;
    while(parts[startIndex] === char) {
        startIndex--;
    }
    startIndex++;

    let blockSize = endIndex-startIndex+1;

    // Find a spot for the block to fit starting from beginning
    let madeAMove = false;
    for (let x = 0; x < startIndex; x++) {
        let char2 = parts[x];
        if (char2 === '.') {
            let spaceEndIndex = x;
            let spaceStartIndex = x;

            while(parts[spaceEndIndex] === '.') {
                spaceEndIndex++;
            }
            spaceEndIndex--;

            let spaceSize = spaceEndIndex - spaceStartIndex+1;

            if (spaceSize >= blockSize) {
                let tmpBlockSize = blockSize;
                for (let y = spaceStartIndex; y <= spaceEndIndex; y++) {
                    if (tmpBlockSize === 0) break;
                    parts[y] = char;
                    tmpBlockSize--;
                }
                tmpBlockSize = blockSize;
                for (let y = startIndex; y <= endIndex; y++) {
                    if(tmpBlockSize === 0) break;
                    parts[y] = '.';
                    tmpBlockSize--;
                }
                madeAMove = true;
                break;
            } else {
                x+=spaceSize;
            }
        }
    }
    if (madeAMove === false) {
        i = i - blockSize+1;
        madeAMove = false;
    }
}

// Calculate checksum
let checkSum = 0;
for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '.') {
        //console.log(`${checkSum} += (${i} * ${parts[i]})`);
        checkSum += (i * parts[i]);
    }
}

console.log(parts.join(''));
console.log('Checksum: ', checkSum);