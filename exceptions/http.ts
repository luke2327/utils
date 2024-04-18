export class HttpException extends Error {
  protected readonly status: number;
  protected readonly msg: string;
  protected readonly errorCode: string;

  constructor(status: number, errorCode: string, msg = '') {
    super(msg);

    this.status = status;
    this.msg = msg;
    this.errorCode = errorCode;
  }
}
