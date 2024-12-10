// Input matrix
const fs = require('fs');
const input = fs.readFileSync('./Day8/input', {encoding: 'utf8'});


// Parse the input into a 2D matrix
const matrix = input.split('\n').map(line => line.split(''));

// Function to calculate unique antinodes
function calculateAntinodes(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Store antenna positions by their frequency
    const antennas = new Map();

    // Populate antennas map
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const char = matrix[r][c];
            if (char !== '.') {
                if (!antennas.has(char)) antennas.set(char, []);
                antennas.get(char).push([r, c]);
            }
        }
    }

    // Set to track unique antinodes
    const antinodes = new Set();

    // Process each frequency
    for (const positions of antennas.values()) {
        const n = positions.length;

        // Compare all pairs of antennas with the same frequency
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const [x1, y1] = positions[i];
                const [x2, y2] = positions[j];

                // Calculate the direction of the line (step size)
                const dx = x2 - x1;
                const dy = y2 - y1;
                const gcd = Math.abs(findGCD(dx, dy));
                const stepX = dx / gcd;
                const stepY = dy / gcd;

                // Traverse in both directions
                traverseAndMark(x1, y1, stepX, stepY, rows, cols, antinodes);
                traverseAndMark(x1, y1, -stepX, -stepY, rows, cols, antinodes);
            }
        }
    }

    // Return the total number of unique antinodes
    return antinodes.size;
}

// Helper function to calculate the greatest common divisor
function findGCD(a, b) {
    return b === 0 ? Math.abs(a) : findGCD(b, a % b);
}

// Traverse along a line and mark positions as antinodes
function traverseAndMark(x, y, stepX, stepY, rows, cols, antinodes) {
    while (x >= 0 && x < rows && y >= 0 && y < cols) {
        antinodes.add(`${x},${y}`);
        x += stepX;
        y += stepY;
    }
}

// Run the program and log the result
const result = calculateAntinodes(matrix);
console.log('Unique Antinodes:', result);
