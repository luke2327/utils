#!/usr/bin/env node
/// <reference types="typescript" />

import {promises as fs} from 'fs';
import fetch from 'node-fetch'

export default {
    downloadFile: async (url, fileLocation) => {
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

    downloadFileTimeout: async (url, fileLocation, timeout = 1000) => {
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
    }
}
