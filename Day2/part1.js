const fs = require('fs');
const input = fs.readFileSync('./Day2/input', {encoding: 'utf8'});

numSafe = 0;
input.split('\n').forEach((line) => {
    let parts = line.split(' ').map((x) => Number(x));
    
    let prev = parts[0];
    let isDescending = false;
    let isAscending = false;

    let isUnsafe = false;
    for(let i = 1; i < parts.length; i++) {
        let curr = parts[i];
        if (prev < curr) {
            if (i === 1) {
                isDescending = true;
            } else {
                if (isAscending) {
                    isUnsafe = true;
                    break;
                };
            }
            if (curr - prev > 3) {
                isUnsafe = true;
                break;
            };
        } else if (prev > curr) {
            if (i === 1) {
                isAscending = true;
            } else {
                if (isDescending) {
                    isUnsafe = true;
                    break;
                };
            }

            if (prev - curr > 3) {
                isUnsafe = true;
                break;
            };
        } else {
            isUnsafe = true;
            break;
        }
        prev = parts[i];
    }

    if (!isUnsafe) {
        numSafe++;
    }
});

console.log(numSafe);