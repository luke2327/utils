/**
 * Removes falsy values from an array.
 *
 * @param {Array<any>} array - The array to compact.
 * @returns A new array with all falsy values removed.
 */
export function compactArray(array: any[]) {
    return array.filter(Boolean);
}