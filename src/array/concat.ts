
/**
 * Concatenates multiple arrays into a single array.
 * 
 * @param {Array<any>} arrays The arrays to concatenate.
 * @returns A new array containing the elements from all the input arrays.
 */
export function concatArray(...arrays: any[]) {
    return [].concat(...arrays);
}