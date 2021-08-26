import { Request } from 'express';

export interface ILoggerHelper {
  log(now: number, req: Request, statusCode: number): void;
}
export const ILoggerHelperToken = 'ILoggerHelperToken';
