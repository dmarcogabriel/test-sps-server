type IBaseErrorOptions<T> = {
  type: string
  message: string
  reason?: T
}
export class BaseError <T = unknown> extends Error {
  public readonly type: string;
  public readonly reason: T | null = null;

  constructor(options: IBaseErrorOptions<T>) {
    super(options.message);
    this.type = options.type;

    if (options.reason) {
      this.reason = options.reason;
    }
  }
}

type IAPIErrorOptions<T> = IBaseErrorOptions<T> & {
  statusNumber: number;
}
export class APIError <T = unknown> extends Error {
  public readonly type: string;
  public readonly statusNumber: number;
  public readonly reason: T | null = null;

  constructor(options: IAPIErrorOptions<T>) {
    super(options.message);
    this.type = options.type;
    this.statusNumber = options.statusNumber;

    if (options.reason) {
      this.reason = options.reason;
    }
  }
}