function generateRandomHexColor() {
    const randomInt = Math.floor(Math.random() * 0xFFFFFF);
    const hexColor = "#" + randomInt.toString(16).padStart(6, '0');
    return hexColor;
}


const randomHexColor = generateRandomHexColor();
console.log("Random Hex Color Code:", randomHexColor);
