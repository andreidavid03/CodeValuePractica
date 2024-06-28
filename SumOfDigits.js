function sumOfDigits(num) {

    let numStr = num.toString();
    let sum = 0;


    for (let char of numStr) {

        sum += parseInt(char, 10);
    }

    return sum;
}

//Exemple
console.log(sumOfDigits(123));
console.log(sumOfDigits(4567));
console.log(sumOfDigits(89));
console.log(sumOfDigits(0));