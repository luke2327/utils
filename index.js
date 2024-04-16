"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.groupBy = exports.chunkArray = exports.findDuplicates = exports.sequenceGenerator = exports.getSize = exports.uniqArray = exports.makeDelay = exports.downloadFileTimeout = exports.downloadFile = void 0;
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * Downloads a file from the specified URL and saves it to the specified file location.
 *
 * @param {string} url - The URL to download from.
 * @param {string} fileLocation - The location to save the file.
 * @returns {Promise<DownloadResponse>} - The download response.
 */
const downloadFile = async (url, fileLocation) => {
    const response = await (0, node_fetch_1.default)(url);
    const buffer = await response.buffer();
    const returnData = {
        url: fileLocation,
        msg: 'ok',
        size: await getSize(fileLocation) || 0,
    };
    await fs_1.promises.writeFile(fileLocation, buffer);
    return returnData;
};
exports.downloadFile = downloadFile;
/**
 * Downloads a file from the specified URL and saves it to the specified file location.
 * If the specified timeout is exceeded, an AbortError is thrown.
 *
 * @param {string} url - The URL to download from.
 * @param {string} fileLocation - The location to save the file.
 * @param {number} timeout - The timeout limit in milliseconds.
 * @returns {Promise<DownloadResponse>} - The download response.
 */
const downloadFileTimeout = async (url, fileLocation, timeout = 1000) => {
    const abortController = new AbortController();
    const downloadTime = setTimeout(() => abortController.abort(), timeout);
    const response = await (0, node_fetch_1.default)(url, { signal: abortController.signal });
    const buffer = await response.buffer();
    const returnData = {
        url: fileLocation,
        msg: 'ok',
        size: await getSize(fileLocation) || 0,
    };
    await fs_1.promises.writeFile(fileLocation, buffer);
    clearTimeout(downloadTime);
    return returnData;
};
exports.downloadFileTimeout = downloadFileTimeout;
/**
 * Makes the program wait for the specified time in milliseconds.
 *
 * @param {number} t - The time to wait in milliseconds.
 */
const makeDelay = async (t = 1000) => {
    await new Promise((resolve) => setTimeout(() => resolve(), t));
};
exports.makeDelay = makeDelay;
/**
 * Removes duplicate elements from an array.
 *
 * @param {Array<any>} array - The array to remove duplicates from.
 * @returns {Array<any>} - The array with duplicates removed.
 */
const uniqArray = (array) => [...new Set(array)];
exports.uniqArray = uniqArray;
/**
 * Gets the size of a file.
 *
 * @param {PathLike} fileLocation - The location of the file.
 * @returns {Promise<number>} - The size of the file in megabytes.
 */
const getSize = async (fileLocation) => {
    const { size } = await fs_1.promises.stat(fileLocation);
    return size / (1024 * 1024);
};
exports.getSize = getSize;
/**
 * Generates a sequence of numbers within the specified range.
 *
 * @param {number} minVal - The minimum value of the sequence.
 * @param {number} maxVal - The maximum value of the sequence.
 * @yields {number} - The next number in the sequence.
 */
const sequenceGenerator = function* (minVal, maxVal) {
    let currVal = minVal;
    while (currVal <= maxVal)
        yield currVal++;
};
exports.sequenceGenerator = sequenceGenerator;
/**
 * Finds duplicate elements in an array.
 *
 * @param {Array<T>} array - The array to find duplicates in.
 * @returns {Array<T> | []} - The array of duplicate elements, or an empty array if no duplicates are found.
 */
const findDuplicates = (array) => array.filter((item, index) => array.indexOf(item) !== index);
exports.findDuplicates = findDuplicates;
/**
 * Splits an array into chunks of the specified size.
 *
 * @param {Array<any>} array - The array to split into chunks.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {Array<T>} - The array of chunks.
 */
const chunkArray = (array, chunkSize) => {
    const newChunk = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        newChunk.push(chunk);
    }
    return newChunk;
};
exports.chunkArray = chunkArray;
/**
 * Groups an array of objects by a specified key.
 *
 * @param {Array<{ [key in string]: any }>} data - The array of objects to group.
 * @param {string} key - The key to group by.
 * @returns {Object} - The grouped object.
 */
const groupBy = (data, key) => {
    return data.reduce(function (carry, el) {
        const group = el[key];
        if (carry[group] === undefined) {
            carry[group] = [];
        }
        carry[group].push(el);
        return carry;
    }, {});
};
exports.groupBy = groupBy;
/**
 * Checks if a value is empty.
 *
 * @param {string | number | object} value - The value to check.
 * @returns {boolean} - True if the value is empty, false otherwise.
 */
const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== 'number' && value === '') {
        return true;
    }
    else if (typeof value === 'undefined' || value === undefined) {
        return true;
    }
    else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.isEmpty = isEmpty;
