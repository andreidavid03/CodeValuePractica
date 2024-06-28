function convertToRoman(num) {

    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];


    let result = '';


    for (let { value, numeral } of romanNumerals) {

        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }

    return result;
}

// Exemple
console.log(convertToRoman(36));
console.log(convertToRoman(1990));
console.log(convertToRoman(2023));
console.log(convertToRoman(4));
console.log(convertToRoman(3999));
