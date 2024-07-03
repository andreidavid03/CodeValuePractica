function arePermutations(arr1, arr2) {

    if (arr1.length !== arr2.length) {
        return false;
    }


    const frequencyMap1 = {};
    const frequencyMap2 = {};

    for (let elem of arr1) {
        frequencyMap1[elem] = (frequencyMap1[elem] || 0) + 1;
    }

    for (let elem of arr2) {
        frequencyMap2[elem] = (frequencyMap2[elem] || 0) + 1;
    }


    for (let key in frequencyMap1) {
        if (frequencyMap1[key] !== frequencyMap2[key]) {
            return false;
        }
    }

    return true;
}

// Example:
const array1 = [1, 2, 3, 4];
const array2 = [4, 3, 2, 1];
const array3 = [1, 2, 2, 4];

console.log(arePermutations(array1, array2)); // Output: true
console.log(arePermutations(array1, array3)); // Output: false
