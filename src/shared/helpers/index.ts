import { Request } from 'express';

export interface ILoggerHelper {
  log(req: Request, statusCode: number, now?: number): void;
}
export const ILoggerHelperToken = 'ILoggerHelperToken';

export interface ILocationHelper {
  translateRequest(params: Array<string>): Array<string>;
}
