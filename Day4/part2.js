const fs = require('fs');
const input = fs.readFileSync('./Day4/input', {encoding: 'utf8'});

// Create matrix
let matrix = input.split('\n').map((line) => line.split(''));

let total = 0;

// Loop through each row and column
for(let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        // if character is "x" then look in all directions
        let char = matrix[y][x];

        if (char === 'A') {
            let northeast = '';
            let northwest = '';
            let southeast = '';
            let southwest = '';

            if (matrix[y-1] && matrix[y+1] && matrix[y-1][x-1] && matrix[y-1][x+1] && matrix[y+1][x-1] && matrix[y+1][x+1]) {
                // We're in the middle not stuck in a corner
                // And we're on the letter A
                northeast = `${matrix[y-1][x+1]}${char}${matrix[y+1][x-1]}`;
                northwest = `${matrix[y-1][x-1]}${char}${matrix[y+1][x+1]}`;
                southeast = `${matrix[y+1][x+1]}${char}${matrix[y-1][x-1]}`;
                southwest = `${matrix[y+1][x-1]}${char}${matrix[y-1][x+1]}`;
            }

            let tmp = 0;
            [northeast,northwest,southeast,southwest].forEach((word) => {
                if (word === 'MAS') {
                    tmp++;

                    if (tmp === 2) {
                        total++;
                    }
                }
            });
        }
    }
}

console.log(total);