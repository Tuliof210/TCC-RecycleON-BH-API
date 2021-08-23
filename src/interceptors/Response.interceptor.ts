import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
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

  private readonly errorMap = {
    CastError: 400,
    UnauthorizedException: 401,
    ValidationError: 403,
    'Not Found': 404,
    MongooseServerSelectionError: 503,
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest() as Request;
    const res = context.switchToHttp().getResponse() as Response;

    return next.handle().pipe(
      map((result) => {
        this.logHttpResponse(now, req, res.statusCode ?? 200);
        return result;
      }),
      catchError((e) => {
        const error = new HttpException({ name: e.name, message: e.message }, this.getErrorStatusCode(e));

        this.logHttpResponse(now, req, error.getStatus() ?? 500);
        return throwError(() => error);
      }),
    );
  }

  private getErrorStatusCode(error: Error) {
    if (this.errorMap[error.name]) return this.errorMap[error.name];
    if (error.name == 'MongoError' && error.message.includes('E11000 duplicate key error')) return 409;
    if (
      error.name == 'MongoError' &&
      error.message.includes('Performing an update on the path') &&
      error.message.includes('would modify the immutable field')
    )
      return 400;
    return 500;
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
