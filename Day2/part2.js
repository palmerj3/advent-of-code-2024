const fs = require('fs');
const input = fs.readFileSync('./Day2/input', {encoding: 'utf8'});

numSafe = 0;

function checkSafety(arr) {
    let prev = arr[0];
    let isDescending = false;
    let isAscending = false;

    let isUnsafe = false;
    for(let i = 1; i < arr.length; i++) {
        let curr = arr[i];
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
        prev = arr[i];
    }

    return isUnsafe;
}

input.split('\n').forEach((line) => {
    let parts = line.split(' ').map((x) => Number(x));
    
    if (checkSafety(parts) === false) {
        numSafe++;
    } else {
        for (let i = 0; i < parts.length; i++) {
            let arr = [...parts];
            arr.splice(i, 1);

            if (checkSafety(arr) === false) {
                numSafe++;
                break;
            }
        }
    }
});

console.log(numSafe);