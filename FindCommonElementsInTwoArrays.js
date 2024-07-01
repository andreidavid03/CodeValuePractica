function findCommonElements(arr1, arr2) {

    const set1 = new Set(arr1);
    const commonElements = arr2.filter(element => set1.has(element));
    return commonElements;
}


const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
const common = findCommonElements(array1, array2);
console.log("Common Elements:", common);
