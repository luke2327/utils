import { PathLike, promises as fs } from 'fs';
import fetch from 'node-fetch';

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
const downloadFile = async (url: string, fileLocation: string): Promise<DownloadResponse> => {
  const response = await fetch(url);

  const buffer = await response.buffer();
  const returnData = {
    url: fileLocation,
    msg: 'ok',
    size: await getSize(fileLocation) || 0,
  };

  await fs.writeFile(fileLocation, buffer);

  return returnData;
};

/**
 * Downloads a file from the specified URL and saves it to the specified file location.
 * If the specified timeout is exceeded, an AbortError is thrown.
 *
 * @param {string} url - The URL to download from.
 * @param {string} fileLocation - The location to save the file.
 * @param {number} timeout - The timeout limit in milliseconds.
 * @returns {Promise<DownloadResponse>} - The download response.
 */
const downloadFileTimeout = async (
  url: string,
  fileLocation: string,
  timeout: number = 1000
): Promise<DownloadResponse> => {
  const abortController = new AbortController();
  const downloadTime = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(url, { signal: abortController.signal });

  const buffer = await response.buffer();
  const returnData = {
    url: fileLocation,
    msg: 'ok',
    size: await getSize(fileLocation) || 0,
  };

  await fs.writeFile(fileLocation, buffer);

  clearTimeout(downloadTime);

  return returnData;
};

/**
 * Makes the program wait for the specified time in milliseconds.
 *
 * @param {number} t - The time to wait in milliseconds.
 */
const makeDelay = async (t: number = 1000) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), t));
};

/**
 * Removes duplicate elements from an array.
 *
 * @param {Array<any>} array - The array to remove duplicates from.
 * @returns {Array<any>} - The array with duplicates removed.
 */
const uniqArray = (array: any[]): any[] => [...new Set(array)];

/**
 * Gets the size of a file.
 *
 * @param {PathLike} fileLocation - The location of the file.
 * @returns {Promise<number>} - The size of the file in megabytes.
 */
const getSize = async (fileLocation: PathLike): Promise<number> => {
  const { size } = await fs.stat(fileLocation);

  return size / (1024 * 1024);
};

/**
 * Generates a sequence of numbers within the specified range.
 *
 * @param {number} minVal - The minimum value of the sequence.
 * @param {number} maxVal - The maximum value of the sequence.
 * @yields {number} - The next number in the sequence.
 */
const sequenceGenerator = function* (minVal: number, maxVal: number) {
  let currVal = minVal;

  while (currVal <= maxVal) yield currVal++;
};

/**
 * Finds duplicate elements in an array.
 *
 * @param {Array<T>} array - The array to find duplicates in.
 * @returns {Array<T> | []} - The array of duplicate elements, or an empty array if no duplicates are found.
 */
const findDuplicates = <T = any>(array: Array<T>): Array<T> | [] =>
  array.filter((item, index) => array.indexOf(item) !== index);

/**
 * Splits an array into chunks of the specified size.
 *
 * @param {Array<any>} array - The array to split into chunks.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {Array<T>} - The array of chunks.
 */
const chunkArray = <T = any>(array: Array<any>, chunkSize: number): Array<T> => {
  const newChunk = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);

    newChunk.push(chunk);
  }

  return newChunk as T[];
};

/**
 * Groups an array of objects by a specified key.
 *
 * @param {Array<{ [key in string]: any }>} data - The array of objects to group.
 * @param {string} key - The key to group by.
 * @returns {Object} - The grouped object.
 */
const groupBy = (
  data: { [key in string]: any }[],
  key: string
): { [key in typeof key]: typeof data } => {
  return data.reduce(function (carry, el) {
    const group = el[key];

    if (carry[group] === undefined) {
      carry[group] = [];
    }

    carry[group].push(el);
    return carry;
  }, {});
};

/**
 * Checks if a value is empty.
 *
 * @param {string | number | object} value - The value to check.
 * @returns {boolean} - True if the value is empty, false otherwise.
 */
const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export {
  downloadFile,
  downloadFileTimeout,
  makeDelay,
  uniqArray,
  getSize,
  sequenceGenerator,
  findDuplicates,
  chunkArray,
  groupBy,
  isEmpty,
};
