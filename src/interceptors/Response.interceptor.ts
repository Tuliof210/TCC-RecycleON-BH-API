import { StandardSuccess, StandardError } from 'src/classes';

import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
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
    const req = context.switchToHttp().getRequest() as Request;
    const res = context.switchToHttp().getResponse() as Response;

    return next.handle().pipe(
      map((result) => {
        console.log(result, res.statusCode);
        this.logHttpResponse(now, req, res.statusCode ?? 200);
        return result;
      }),
      catchError((error) => {
        console.log(error);
        this.logHttpResponse(now, req, error.status ?? 500);
        return throwError(() => error);
      }),
    );
  }

  private logHttpResponse(now: number, req: Request, statusCode: number): void {
    const userAgent = req.get('user-agent') || '';
    const { ip, method, path } = req;
    const logKey = this.getLogType(statusCode);

    this.logger[logKey](`${method} ${statusCode} ${path} - ${userAgent} ${ip} | Response time: ${Date.now() - now}ms`);
  }

  private getLogType(status: number): string {
    const key = `${status.toString()[0]}xx`;
    return this.logType[key];
  }
}
