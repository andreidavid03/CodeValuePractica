const readline = require('readline');

function isPalindrome(s) {
    return s === s.split('').reverse().join('');
}

function shortestPalindrome(s) {
    if (isPalindrome(s)) {
        return s;
    }

    for (let i = s.length - 1; i >= 0; i--) {
        if (isPalindrome(s.substring(0, i + 1))) {
            let suffix = s.substring(i + 1).split('').reverse().join('');
            return suffix + s;
        }
    }

    return s;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a word: ', (input) => {
    const result = shortestPalindrome(input);
    console.log("Shortest Palindrome:", result);
    rl.close();
});
