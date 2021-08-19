import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');
  private readonly logType = {
    '1xx': 'verbose',
    '2xx': 'log',
    '3xx': 'warn',
    '4xx': 'error',
    '5xx': 'debug',
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        req ? this.handleHTTP(now, req, res) : this.handleUnknown();
      }),
    );
  }

  private handleHTTP(now: number, req: Request, res: Response): void {
    const userAgent = req.get('user-agent') || '';
    const { ip, method, path } = req;
    const { statusCode } = res;

    const logKey = this.getLogType(statusCode);
    this.logger[logKey](`${method} ${path} ${statusCode} - ${userAgent} ${ip} | Response time: ${Date.now() - now}ms`);
  }

  private getLogType(status: number): string {
    const key = `${status.toString()[0]}xx`;
    return this.logType[key];
  }

  private handleUnknown(): void {
    this.logger.error(`Unknown protocol`);
  }
}
