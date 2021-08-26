import { Request } from 'express';

export interface ILoggerHelper {
  log(req: Request, statusCode: number, now?: number): void;
}
export const ILoggerHelperToken = 'ILoggerHelperToken';
