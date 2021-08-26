import { ILoggerHelper } from '.';

import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerHelper implements ILoggerHelper {
  private logger = new Logger('HTTP');

  private readonly logTypeMap = new Map([
    ['1xx', 'verbose'],
    ['2xx', 'log'],
    ['3xx', 'verbose'],
    ['4xx', 'error'],
    ['5xx', 'warn'],
  ]);

  log(req: Request, statusCode: number, now = 0): void {
    const userAgent = req.get('user-agent') || '';
    const { ip, method, path } = req;
    const logKey = this.getLogType(statusCode);

    this.logger[logKey](`${method} ${statusCode} ${path} - ${userAgent} ${ip} | Response time: ${Date.now() - now}ms`);
  }

  private getLogType(status: number): string {
    const key = `${status.toString()[0]}xx`;
    return this.logTypeMap.get(key);
  }
}
