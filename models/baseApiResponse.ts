
export interface IBaseApiResponse<T> {
  Data: T,
  Message: string,
  ErrorCode: number,
}

export class BaseApiResponse<T> implements IBaseApiResponse<T> {
  Data: T;
  Message: string;
  ErrorCode: number;

  public constructor(init: IBaseApiResponse<T>) {
    this.Data = init.Data;
    this.Message = init.Message;
    this.ErrorCode = init.ErrorCode;
  }
}

export interface IAxiosApiResponse<T> {
  data: IBaseApiResponse<T>
}

export class AxiosApiResponse<T> implements IAxiosApiResponse<T> {
  data: BaseApiResponse<T>

  public constructor(init: IAxiosApiResponse<T>) {
    this.data = new BaseApiResponse(init.data);
  }
}
