const readline = require('readline');

function isUppercase(str) {
    return str === str.toUpperCase();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a string: ', (input) => {
    if (isUppercase(input)) {
        console.log("The string is entirely uppercase.");
    } else {
        console.log("The string is not entirely uppercase.");
    }
    rl.close();
});
