/**
 * Returns the difference between two arrays.
 * @param {Array<any>} array1 - The first array.
 * @param {Array<any>} array2 - The second array.
 * @returns {Array<any>} - The difference between the two arrays.
 */
export function differenceArray(array1: Array<any>, array2: Array<any>): Array<any> {
    return array1.filter(value => !array2.includes(value));
}