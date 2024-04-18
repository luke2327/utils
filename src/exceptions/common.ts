export class Exception extends Error {
    protected readonly msg: string;
    protected readonly errorCode: string;
  
    constructor(errorCode: string, msg = '') {
      super();
  
      this.msg = msg;
      this.errorCode = errorCode;
    }
  }
  