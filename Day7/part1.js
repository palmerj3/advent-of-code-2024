function canReachTarget(target, numbers) {
    function dfs(index, currentValue) {
        if (index === numbers.length) {
            return currentValue === target;
        }
        // Add current number
        if (dfs(index + 1, currentValue + numbers[index])) {
            return true;
        }
        // Multiply current number
        if (dfs(index + 1, currentValue * numbers[index])) {
            return true;
        }
        return false;
    }
    return dfs(1, numbers[0]); // Start with the first number
}

function parseInput(input) {
    const lines = input.trim().split("\n");
    return lines.map(line => {
        const [target, nums] = line.split(": ");
        return {
            target: parseInt(target, 10),
            numbers: nums.split(" ").map(Number)
        };
    });
}

function solveEquations(input) {
    const equations = parseInput(input);
    return equations.map(({ target, numbers }) => {
        return canReachTarget(target, numbers) ? target : 0;
    });
}

const fs = require('fs');
const input = fs.readFileSync('./Day7/input', {encoding: 'utf8'});

const results = solveEquations(input);

let sum = 0;
results.forEach((r) => sum += r);

console.log(sum);
