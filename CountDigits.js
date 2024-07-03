const readline = require('readline');

function countDigits(number) {
    return Math.abs(number).toString().length;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a number: ', (input) => {
    const number = parseFloat(input);
    if (!isNaN(number)) {
        const result = countDigits(number);
        console.log("Total number of digits:", result);
    } else {
        console.log("Invalid input. Please enter a valid number.");
    }
    rl.close();
});
