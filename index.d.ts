import { PathLike } from 'fs';
type DownloadResponse = {
    url: string;
    msg: string;
    size: number;
};
/**
 * Downloads a file from the specified URL and saves it to the specified file location.
 *
 * @param {string} url - The URL to download from.
 * @param {string} fileLocation - The location to save the file.
 * @returns {Promise<DownloadResponse>} - The download response.
 */
declare const downloadFile: (url: string, fileLocation: string) => Promise<DownloadResponse>;
/**
 * Downloads a file from the specified URL and saves it to the specified file location.
 * If the specified timeout is exceeded, an AbortError is thrown.
 *
 * @param {string} url - The URL to download from.
 * @param {string} fileLocation - The location to save the file.
 * @param {number} timeout - The timeout limit in milliseconds.
 * @returns {Promise<DownloadResponse>} - The download response.
 */
declare const downloadFileTimeout: (url: string, fileLocation: string, timeout?: number) => Promise<DownloadResponse>;
/**
 * Makes the program wait for the specified time in milliseconds.
 *
 * @param {number} t - The time to wait in milliseconds.
 */
declare const makeDelay: (t?: number) => Promise<void>;
/**
 * Removes duplicate elements from an array.
 *
 * @param {Array<any>} array - The array to remove duplicates from.
 * @returns {Array<any>} - The array with duplicates removed.
 */
declare const uniqArray: (array: any[]) => any[];
/**
 * Gets the size of a file.
 *
 * @param {PathLike} fileLocation - The location of the file.
 * @returns {Promise<number>} - The size of the file in megabytes.
 */
declare const getSize: (fileLocation: PathLike) => Promise<number>;
/**
 * Generates a sequence of numbers within the specified range.
 *
 * @param {number} minVal - The minimum value of the sequence.
 * @param {number} maxVal - The maximum value of the sequence.
 * @yields {number} - The next number in the sequence.
 */
declare const sequenceGenerator: (minVal: number, maxVal: number) => Generator<number, void, unknown>;
/**
 * Finds duplicate elements in an array.
 *
 * @param {Array<T>} array - The array to find duplicates in.
 * @returns {Array<T> | []} - The array of duplicate elements, or an empty array if no duplicates are found.
 */
declare const findDuplicates: <T = any>(array: T[]) => T[] | [];
/**
 * Splits an array into chunks of the specified size.
 *
 * @param {Array<any>} array - The array to split into chunks.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {Array<T>} - The array of chunks.
 */
declare const chunkArray: <T = any>(array: Array<any>, chunkSize: number) => T[];
/**
 * Groups an array of objects by a specified key.
 *
 * @param {Array<{ [key in string]: any }>} data - The array of objects to group.
 * @param {string} key - The key to group by.
 * @returns {Object} - The grouped object.
 */
declare const groupBy: (data: {
    [x: string]: any;
}[], key: string) => {
    [x: string]: {
        [x: string]: any;
    }[];
};
/**
 * Checks if a value is empty.
 *
 * @param {string | number | object} value - The value to check.
 * @returns {boolean} - True if the value is empty, false otherwise.
 */
declare const isEmpty: (value: string | number | object) => boolean;
export { downloadFile, downloadFileTimeout, makeDelay, uniqArray, getSize, sequenceGenerator, findDuplicates, chunkArray, groupBy, isEmpty, };
