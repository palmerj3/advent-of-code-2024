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

function drawMatrix(m, i) {
    console.log(`***** Tick ${i} *****`);
    m.forEach((line) => {
        let lineStr = '';
        line.map((x) => lineStr += x);
        console.log(lineStr);
    });
    console.log('*************************\n');
}

let visited = {};
let uniqueVisited = {};

// Returns true if guard position has not been visited, false otherwise
function tick(i) {
    // Determine next move tile for guard
    // based on where they are facing
    let nextTile = guardlocation;
    let newDirection = guardDirection;
    let leavingArea = false;
    switch(matrix[guardlocation[0]][guardlocation[1]]) {
        case '^':
            if (guardlocation[0] === 0) {
                leavingArea = true;
            } else if (matrix[guardlocation[0]-1][guardlocation[1]] === '#') {
                // Change guard facing direction
                newDirection = '>';
            } else {
                nextTile = [guardlocation[0]-1, guardlocation[1]];
            }
            break;
        case '>':
            if (guardlocation[1] === matrix[0].length-1) {
                leavingArea = true;
            } else if (matrix[guardlocation[0]][guardlocation[1]+1] === '#') {
                // Change guard facing direction
                newDirection = 'v';
            } else {
                nextTile = [guardlocation[0], guardlocation[1]+1];
            }
            break;
        case '<':
            if (guardlocation[1] === 0) {
                leavingArea = true;
            } else if (matrix[guardlocation[0]][guardlocation[1]-1] === '#') {
                // Change guard facing direction
                newDirection = '^';
            } else {
                nextTile = [guardlocation[0], guardlocation[1]-1];
            }
            break;
        case 'v':
            if (guardlocation[0] === matrix[0].length-1) {
                leavingArea = true;
            } else if (matrix[guardlocation[0]+1][guardlocation[1]] === '#') {
                // Change guard facing direction
                newDirection = '<';
            } else {
                nextTile = [guardlocation[0]+1, guardlocation[1]];
            }
            break;
    }

    // drawMatrix(matrix, i);

    let hasBeenVisited = visited.hasOwnProperty(`${guardlocation}${guardDirection}`);
    //let hasBeenVisited = uniqueVisited.hasOwnProperty(`${guardlocation}`);

    // Record current guard position
    if (nextTile !== guardlocation) {
        visited[`${guardlocation}${guardDirection}`] = i;
        uniqueVisited[`${guardlocation}`] = i;
    
        // Mark current guard spot as visited in matrix
        matrix[guardlocation[0]][guardlocation[1]] = 'X';
    }

    // Update matrix with new guard position
    guardDirection = newDirection;
    guardlocation = nextTile;

    matrix[guardlocation[0]][guardlocation[1]] = guardDirection;

    if (hasBeenVisited) {
        console.log(`Repeated pattern last seen on tick: ${visited[`${guardlocation}${guardDirection}`]}`)
    }
    return hasBeenVisited || leavingArea;
}

let ticks = 0;
while(!tick(ticks++)) {}

console.log(Object.keys(uniqueVisited).length + 1);