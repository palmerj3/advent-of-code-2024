const fs = require('fs');
const input = fs.readFileSync('./Day8/inputSample', {encoding: 'utf8'});
//const input = fs.readFileSync('./Day8/input', {encoding: 'utf8'});

let matrix = [];
let antennas = {};
let antinodes = {};

input.split('\n').forEach((line, y) => {
    matrix.push(line.split(''));

    matrix[y].forEach((m, x) => {
        if (m !== '.') {
            if(!antennas.hasOwnProperty(m)) {
                antennas[m] = [];
            }

            antennas[m].push([y,x]);
        }
    })
});

function drawMatrixWithAntinodes(m, a) {
    let mTmp = JSON.parse(JSON.stringify(m, null, 2));

    Object.keys(a).forEach((ant) => {
        let y = ant.split(',')[0];
        let x = ant.split(',')[1];

        if (mTmp[y][x] === '.') {
            mTmp[y][x] = '#';
        } else {
            mTmp[y][x] = m[y][x];
        }
    });

    mTmp.forEach((row) => {
        console.log(row.join(''));
    });
}

Object.keys(antennas).forEach((a) => {
    let localAntennas = antennas[a];

    for (let i = 0; i < localAntennas.length; i++) {
        for (let x = 0; x < localAntennas.length; x++) {
            if (i === x) {
                continue;
            }

            let a1Y, a1X;
            let yDiff, xDiff;

            let up = false;
            let down = false;
            let upLeft = false;
            let upRight = false;
            let downLeft = false;
            let downRight = false;

            // Determine Y difference
            if (localAntennas[i][0] < localAntennas[x][0]) {
                // 1 is lower (higher) than 2
                yDiff = localAntennas[x][0] - localAntennas[i][0];

                // Determine X difference
                if (localAntennas[i][1] < localAntennas[x][1]) {
                    // 1 is to the left of 2
                    xDiff = localAntennas[x][1] - localAntennas[i][1];
                    a1X = localAntennas[i][1] - xDiff;

                    upLeft = true;
                } else if (localAntennas[i][1] > localAntennas[x][1]) {
                    // 1 is to the right of 2
                    xDiff = localAntennas[i][1] - localAntennas[x][1];
                    a1X = localAntennas[i][1] + xDiff;

                    upRight = true;
                } else {
                    // Same X value
                    xDiff = 0;
                    a1X = localAntennas[i][1];

                    up = true;
                }

                a1Y = localAntennas[i][0] - yDiff;
            } else if (localAntennas[i][0] > localAntennas[x][0]) {
                // 1 is higher (lower) than 2
                yDiff = localAntennas[i][0] - localAntennas[x][0];

                // Determine X difference
                if (localAntennas[i][1] < localAntennas[x][1]) {
                    // 1 is to the right of 2
                    xDiff = localAntennas[x][1] - localAntennas[i][1];
                    a1X = localAntennas[i][1] - xDiff;

                    downLeft = true;
                } else if (localAntennas[i][1] > localAntennas[x][1]) {
                    // 1 is to the left of 2
                    xDiff = localAntennas[i][1] - localAntennas[x][1];
                    a1X = localAntennas[i][1] + xDiff;

                    downRight = true;
                } else {
                    // Same X value
                    xDiff = 0;
                    a1X = localAntennas[i][1];

                    down = true;
                }

                a1Y = localAntennas[i][0] + yDiff;
            }

            // Determine if antinode locations are within the map boundaries
            let prevY, prevX;
            while (a1Y >= 0 && a1Y <= matrix.length-1 && a1X >= 0 && a1X <= matrix[0].length-1) {
                prevY = a1Y;
                prevX = a1X;

                antinodes[`${a1Y},${a1X}`] = 1;
                antinodes[`${localAntennas[i][0]},${localAntennas[i][1]}`] = 1;
                antinodes[`${localAntennas[x][0]},${localAntennas[x][1]}`] = 1;

                // Keep trying to create a new antinode following
                // same tragectory
                if (up) {
                    a1Y -= yDiff;
                } else if (down) {
                    a1Y += yDiff;
                } else if (upLeft) {
                    a1Y -= yDiff;
                    a1X -= xDiff;
                } else if (upRight) {
                    a1Y -= yDiff;
                    a1X += xDiff;
                } else if (downLeft) {
                    a1Y += yDiff;
                    a1X -= xDiff;
                } else if (downRight) {
                    a1Y += yDiff;
                    a1X += xDiff;
                }
            }
        }
    }
});

drawMatrixWithAntinodes(matrix, antinodes);

//console.log(antinodes);
console.log('Unique: ', Object.keys(antinodes).length)