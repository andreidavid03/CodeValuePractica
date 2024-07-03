const readline = require('readline');

function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num ||
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
            return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let board = [];
let rowCount = 0;

console.log("Enter the Sudoku puzzle row by row. Use 0 for empty cells.");

function getInput() {
    rl.question(`Row ${rowCount + 1}: `, (input) => {
        if (input.length !== 9 || !/^[0-9]+$/.test(input)) {
            console.log("Invalid input. Please enter exactly 9 digits (0-9).");
            getInput();
        } else {
            board.push(input.split('').map(Number));
            rowCount++;
            if (rowCount < 9) {
                getInput();
            } else {
                if (solveSudoku(board)) {
                    console.log("Sudoku solved:");
                    console.log(board.map(row => row.join(' ')).join('\n'));
                } else {
                    console.log("No solution exists.");
                }
                rl.close();
            }
        }
    });
}

getInput();