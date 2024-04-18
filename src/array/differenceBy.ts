/**
 * Returns the difference between two arrays based on a specific key.
 * @param {Array<any>} array1 - The first array.
 * @param {Array<any>} array2 - The second array.
 * @param {string} key - The key to compare the arrays.
 * @returns {Array<any>} - The difference between the two arrays based on the specified key.
 */
export function differenceByArray(array1: Array<any>, array2: Array<any>, key: string): Array<any> {
    return array1.filter(value => !array2.map(item => item[key]).includes(value[key]));
}
