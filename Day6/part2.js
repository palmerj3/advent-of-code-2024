const fs = require('fs');
const input = fs.readFileSync('./Day6/inputReal', {encoding: 'utf8'});

let matrix = [];
input.split('\n').forEach((line, y) => {
    matrix.push(line.split(''));
});

// Locate guard
function isGuard(input) {
    switch (input) {
        case '^':
        case '>':
        case '<':
        case 'v':
            return true;
            break;
    }
    return false;
}

let guardlocation = null;
let guardDirection = null;
matrix.forEach((line, y) => {
    let found = line.findIndex(isGuard);

    if (found !== -1) {
        guardlocation = [y, found];
        guardDirection = matrix[y][found];
    }
});

function drawMatrix(m) {
    console.log('*************************');
    m.forEach((line) => {
        let lineStr = '';
        line.map((x) => lineStr += x);
        console.log(lineStr);
    });
    console.log('*************************\n');
}

let visited = {};
let uniqueVisited = {};

// Returns 0 if guard position hasn't been visited
// Returns 1 if guard will leave area
// Returns 2 if guard position has been visited (loop)
function tick(m) {
    // Determine next move tile for guard
    // based on where they are facing
    let nextTile = guardlocation;
    let newDirection = guardDirection;
    let leavingArea = false;
    switch(m[guardlocation[0]][guardlocation[1]]) {
        case '^':
            if (guardlocation[0] === 0) {
                leavingArea = true;
            } else if (m[guardlocation[0]-1][guardlocation[1]] === '#') {
                // Change guard facing direction
                newDirection = '>';
            } else {
                nextTile = [guardlocation[0]-1, guardlocation[1]];
            }
            break;
        case '>':
            if (guardlocation[1] === m[0].length-1) {
                leavingArea = true;
            } else if (m[guardlocation[0]][guardlocation[1]+1] === '#') {
                // Change guard facing direction
                newDirection = 'v';
            } else {
                nextTile = [guardlocation[0], guardlocation[1]+1];
            }
            break;
        case '<':
            if (guardlocation[1] === 0) {
                leavingArea = true;
            } else if (m[guardlocation[0]][guardlocation[1]-1] === '#') {
                // Change guard facing direction
                newDirection = '^';
            } else {
                nextTile = [guardlocation[0], guardlocation[1]-1];
            }
            break;
        case 'v':
            if (guardlocation[0] === m[0].length-1) {
                leavingArea = true;
            } else if (m[guardlocation[0]+1][guardlocation[1]] === '#') {
                // Change guard facing direction
                newDirection = '<';
            } else {
                nextTile = [guardlocation[0]+1, guardlocation[1]];
            }
            break;
    }

    //drawMatrix(m);

    let hasBeenVisited = visited.hasOwnProperty(`${guardlocation}${guardDirection}`);
    //let hasBeenVisited = uniqueVisited.hasOwnProperty(`${guardlocation}`);

    // Record current guard position
    if (nextTile !== guardlocation) {
        visited[`${guardlocation}${guardDirection}`] = true;
        uniqueVisited[`${guardlocation}`] = true;
    
        // Mark current guard spot as visited in matrix
        m[guardlocation[0]][guardlocation[1]] = 'X';
    }

    // Update matrix with new guard position
    guardDirection = newDirection;
    guardlocation = nextTile;

    m[guardlocation[0]][guardlocation[1]] = guardDirection;


    if (hasBeenVisited) {
        return 2;
    } else if (leavingArea) {
        return 1;
    }
    return 0;
}

// Note all positions for a new obstacle "."
let obstaclePositions = [];
for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] === '.') {
            obstaclePositions.push([y,x]);
        }
    }
}

let numLoop = 0;
obstaclePositions.forEach((o, i) => {
    // Reset state
    let newMatrix = JSON.parse(JSON.stringify(matrix));

    visited = {};
    uniqueVisited = {};
    guardlocation = null;
    guardDirection = null;
    newMatrix.forEach((line, y) => {
        let found = line.findIndex(isGuard);

        if (found !== -1) {
            guardlocation = [y, found];
            guardDirection = newMatrix[y][found];
        }
    });

    // Place obstacle in new matrix
    newMatrix[o[0]][o[1]] = '#';

    // drawMatrix(newMatrix);
    // console.log("UNTOUCHED MATRIX");
    // drawMatrix(matrix);

    let keepGoing = true;
    let ticks = 0;
    while(keepGoing) {
        ticks++;

        // console.log('Obstacle: ', i, 'Tick:', ticks);
        let result = tick(newMatrix);

        if (result === 0) {
            keepGoing = true;
        } else if (result === 1) {
            keepGoing = false;
        } else if (result === 2) {
            keepGoing = false;
            numLoop++;
            console.log('Obstacle: ', i, '/', obstaclePositions.length, 'Tick: ', ticks, 'Found loop number: ', numLoop);
        }
    }
});

console.log('Loop positions: ', numLoop);

