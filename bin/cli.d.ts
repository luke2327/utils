declare module '@luke2327/utils' {
  export type DownloadResponse = {
    url: string,
    msg: 'ok' | string,
    size: number;
  }

  export function downloadFile(url: string, fileLocation: string): Promise<DownloadResponse>;
}
