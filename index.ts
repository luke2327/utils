import {PathLike, promises as fs} from 'fs';
import fetch from 'node-fetch'

type DownloadResponse = {
  url: string;
  msg: string;
  size: number;
}

const getSize = async (fileLocation: PathLike) => {
  const { size } = await fs.stat(fileLocation);

  return size / (1024 * 1024);
};

export default {
  /**
   * URLからダウンロードして指定した経路に保存します。
   *
   * @param {string} url - 呼び出す住所
   * @param {string} fileLocation - 保存する経路
   */
  downloadFile: async (url: string, fileLocation: string): Promise<DownloadResponse> => {
    const response = await fetch(url);

    const buffer = await response.buffer();
    const returnData = {
      url: fileLocation,
      msg: 'ok',
      size: await getSize(fileLocation) || 0
    };

    await fs.writeFile(fileLocation, buffer)

    return returnData;
  },

  /**
   * URLからダウンロードして指定した経路に保存します。
   * 指定した時間が過ぎたらAbortErrorを返還します。
   *
   * @param {string} url - 呼び出す住所
   * @param {string} fileLocation - 保存する経路
   * @param {number} timeout - 時間制限を設定
   */
  downloadFileTimeout: async (url: string, fileLocation: string, timeout: number = 1000): Promise<DownloadResponse> => {
    const abortController = new AbortController();
    const downloadTime = setTimeout(() => abortController.abort(), timeout);
    const response = await fetch(url, {signal: abortController.signal});

    const buffer = await response.buffer();
    const returnData = {
      url: fileLocation,
      msg: 'ok',
      size: await getSize(fileLocation) || 0
    };

    await fs.writeFile(fileLocation, buffer);

    clearTimeout(downloadTime);

    return returnData;
  },

  /**
   * 指定した時間を待ちます。1s = 1000
   *
   * @param {number} t
   */
  makeDelay: async (t: number = 1000) => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), t));
  },

  /**
   * 配列から同じ属性を削除します。
   *
   * @param {Array<any>} array
   */
  uniqArray: (array: any[]) => [...new Set(array)],

  getSize,

}
