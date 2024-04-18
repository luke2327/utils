import fetch from 'node-fetch';
import { PathLike, promises as fs } from 'fs';
import { Filter } from './types';
import { Exception } from './exceptions/common';

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
export async function downloadFile(url: string, fileLocation: string): Promise<DownloadResponse> {
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
export async function downloadFileTimeout(
  url: string,
  fileLocation: string,
  timeout: number = 1000
): Promise<DownloadResponse> {
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


export async function removeFile(fileLocation: PathLike) {
  try {
    await fs.unlink(fileLocation);
  } catch (e) {
    throw new Exception('FILE_DELETE_ERROR');
  }
};

/**
 * Makes the program wait for the specified time in milliseconds.
 *
 * @param {number} t - The time to wait in milliseconds.
 */
export async function makeDelay(t: number = 1000) {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), t));
};

/**
 * Removes duplicate elements from an array.
 *
 * @param {Array<any>} array - The array to remove duplicates from.
 * @returns {Array<any>} - The array with duplicates removed.
 */
export function uniqArray(array: any[]): any[] {
  return [...new Set(array)]
};

/**
 * Gets the size of a file.
 *
 * @param {PathLike} fileLocation - The location of the file.
 * @returns {Promise<number>} - The size of the file in megabytes.
 */
export async function getSize(fileLocation: PathLike): Promise<number> {
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
export function* sequenceGenerator (minVal: number, maxVal: number) {
  let currVal = minVal;

  while (currVal <= maxVal) yield currVal++;
};

/**
 * Finds duplicate elements in an array.
 *
 * @param {Array<T>} array - The array to find duplicates in.
 * @returns {Array<T> | []} - The array of duplicate elements, or an empty array if no duplicates are found.
 */
export function findDuplicates<T = any>(array: Array<T>): Array<T> | [] {
  return array.filter((item, index) => array.indexOf(item) !== index);
}

/**
 * Splits an array into chunks of the specified size.
 *
 * @param {Array<any>} array - The array to split into chunks.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {Array<T>} - The array of chunks.
 */
export function chunkArray<T = any>(array: Array<any>, chunkSize: number): Array<T> {
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
 * @param {Array<{ [key in string]: any }>} arr - The array of objects to group.
 * @param {string} key - The key to group by.
 * @returns {Object} - The grouped object.
 */
export function groupBy<
  T extends Record<PropertyKey, any>,
  Key extends Filter<T>
>(arr: T[], key: Key): Record<T[Key], T[]> {
  return arr.reduce((accumulator, val) => {
    const groupedKey = val[key];
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as Record<T[Key], T[]>);
}

/**
 * Checks if a value is empty.
 *
 * @param {string | number | object} value - The value to check.
 * @returns {boolean} - True if the value is empty, false otherwise.
 */
export function isEmpty(value: string | number | object): boolean {
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

export function isNull(value: any): boolean {
  return value === null || value === undefined || value === '';
}