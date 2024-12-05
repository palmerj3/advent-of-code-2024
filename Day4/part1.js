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

        if (char === 'X') {
            let north = '';
            let south = '';
            let east = '';
            let west = '';
            let northeast = '';
            let northwest = '';
            let southeast = '';
            let southwest = '';

            if (matrix[y-3]) {
                north = `${char}${matrix[y-1][x]}${matrix[y-2][x]}${matrix[y-3][x]}`;
            }
            
            if (matrix[y+3]) {
                south = `${char}${matrix[y+1][x]}${matrix[y+2][x]}${matrix[y+3][x]}`;
            }
                
            if (matrix[y][x+3]) {
                east = `${char}${matrix[y][x+1]}${matrix[y][x+2]}${matrix[y][x+3]}`;
            }
           
            if (matrix[y][x-3]) {
                west = `${char}${matrix[y][x-1]}${matrix[y][x-2]}${matrix[y][x-3]}`;
            }

            // Diagonals
            if (matrix[y-3] && matrix[y-3][x+3]) {
                northeast = `${char}${matrix[y-1][x+1]}${matrix[y-2][x+2]}${matrix[y-3][x+3]}`;
            }

            if (matrix[y-3] && matrix[y-3][x-3]) {
                northwest = `${char}${matrix[y-1][x-1]}${matrix[y-2][x-2]}${matrix[y-3][x-3]}`;
            }

            if (matrix[y+3] && matrix[y+3][x+3]) {
                southeast = `${char}${matrix[y+1][x+1]}${matrix[y+2][x+2]}${matrix[y+3][x+3]}`;
            }

            if (matrix[y+3] && matrix[y+3][x-3]) {
                southwest = `${char}${matrix[y+1][x-1]}${matrix[y+2][x-2]}${matrix[y+3][x-3]}`;
            }

            [north,south,east,west,northeast,northwest,southeast,southwest].forEach((word) => {
                if (word === 'XMAS') {
                    total++;
                }
            });
        }
    }
}

console.log(total);