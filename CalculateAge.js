function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
}

// Exemple
console.log(calculateAge(1990));
console.log(calculateAge(2000));
console.log(calculateAge(2010));
