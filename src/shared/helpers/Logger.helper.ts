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

  log(req: Request, statusCode: number, now?: number) {
    const responseTime = now ? Date.now() - now : 0;
    const logKey = this.getLogType(statusCode);

    const { ip, method, path } = req;
    const userAgent = req.get('user-agent') || 'unknown';

    this.logger[logKey](`${method} ${statusCode} ${path} - ${userAgent} ${ip} | Latency: ${responseTime}ms`);
  }

  private getLogType(status: number): string {
    const key = `${status.toString()[0]}xx`;
    return this.logTypeMap.get(key);
  }
}
