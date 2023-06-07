"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
const getSize = async (fileLocation) => {
    const { size } = await fs_1.promises.stat(fileLocation);
    return size / (1024 * 1024);
};
exports.default = {
    /**
     * URLからダウンロードして指定した経路に保存します。
     *
     * @param {string} url - 呼び出す住所
     * @param {string} fileLocation - 保存する経路
     */
    downloadFile: async (url, fileLocation) => {
        const response = await (0, node_fetch_1.default)(url);
        const buffer = await response.buffer();
        const returnData = {
            url: fileLocation,
            msg: 'ok',
            size: await getSize(fileLocation) || 0
        };
        await fs_1.promises.writeFile(fileLocation, buffer);
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
    downloadFileTimeout: async (url, fileLocation, timeout = 1000) => {
        const abortController = new AbortController();
        const downloadTime = setTimeout(() => abortController.abort(), timeout);
        const response = await (0, node_fetch_1.default)(url, { signal: abortController.signal });
        const buffer = await response.buffer();
        const returnData = {
            url: fileLocation,
            msg: 'ok',
            size: await getSize(fileLocation) || 0
        };
        await fs_1.promises.writeFile(fileLocation, buffer);
        clearTimeout(downloadTime);
        return returnData;
    },
    /**
     * 指定した時間を待ちます。1s = 1000
     *
     * @param {number} t
     */
    makeDelay: async (t = 1000) => {
        await new Promise((resolve) => setTimeout(() => resolve(), t));
    },
    /**
     * 配列から同じ属性を削除します。
     *
     * @param {Array<any>} array
     */
    uniqArray: (array) => [...new Set(array)],
    getSize,
};
