const fs = require('fs');

const inputOrdering = fs.readFileSync('./Day5/inputOrdering', {encoding: 'utf8'});
const inputPages = fs.readFileSync('./Day5/inputPages', {encoding: 'utf8'});

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((element, index) => element === arr2[index]);
}

// Create a lookup table of ordering
let ordering = {};
inputOrdering.split('\n').forEach((line) => {
    let parts = line.split('|');
    let left = Number(parts[0]);
    let right = Number(parts[1]);

    if (!ordering.hasOwnProperty(left)) {
        ordering[left] = {};
    }

    ordering[left][right] = 1;
});

let sum = 0;
inputPages.split('\n').forEach((line) => {
    let pages = line.split(',').map((p) => Number(p));
    let original = [...pages];

    pages.sort((a, b) => {
        if (ordering[a] && ordering[a][b]) {
            return -1;
        } else if (ordering[b] && ordering[b][a]) {
            return 1;
        }

        return 0;
    });

    // See if sorted matches original
    if (!compareArrays(pages, original)) {
        let middle = pages[Math.floor(pages.length / 2)];
        sum += middle;
    }
});

console.log(sum);