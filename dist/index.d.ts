/// <reference types="node" />
import { PathLike } from 'fs';
type DownloadResponse = {
    url: string;
    msg: string;
    size: number;
};
declare const _default: {
    /**
     * URLからダウンロードして指定した経路に保存します。
     *
     * @param {string} url - 呼び出す住所
     * @param {string} fileLocation - 保存する経路
     */
    downloadFile: (url: string, fileLocation: string) => Promise<DownloadResponse>;
    /**
     * URLからダウンロードして指定した経路に保存します。
     * 指定した時間が過ぎたらAbortErrorを返還します。
     *
     * @param {string} url - 呼び出す住所
     * @param {string} fileLocation - 保存する経路
     * @param {number} timeout - 時間制限を設定
     */
    downloadFileTimeout: (url: string, fileLocation: string, timeout?: number) => Promise<DownloadResponse>;
    /**
     * 指定した時間を待ちます。1s = 1000
     *
     * @param {number} t
     */
    makeDelay: (t?: number) => Promise<void>;
    /**
     * 配列から同じ属性を削除します。
     *
     * @param {Array<any>} array
     */
    uniqArray: (array: any[]) => any[];
    getSize: (fileLocation: PathLike) => Promise<number>;
};
export default _default;
