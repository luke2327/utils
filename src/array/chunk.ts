/**
 * Splits an array into smaller chunks of a specified size.
 *
 * @param {Array<any>} array - The array to be chunked.
 * @param {number} chunkSize - The size of each chunk.
 * @returns An array of chunks.
 */
export function chunkArray(array: any[], chunkSize: number) {
    const newChunk = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        newChunk.push(chunk);
    }
    return newChunk;
}