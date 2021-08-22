import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
      map((result) => {
        //TODO check if is logging correctly
        this.logHttpResponse(now, req, res);
        this.successHttpResponse(res, 201)(result);
      }),
      catchError((err) => {
        //TODO fix this -> current is logging as a success
        console.log(err);
        this.logHttpResponse(now, req, res);
        return of(this.errorHttpResponse(res)(err));
      }),
    );
  }

  private logHttpResponse(now: number, req: Request, res: Response): void {
    const userAgent = req.get('user-agent') || '';
    const { ip, method, path } = req;
    const { statusCode } = res;

    console.log(method, statusCode);

    const logKey = this.getLogType(statusCode);
    this.logger[logKey](`${method} ${path} ${statusCode} - ${userAgent} ${ip} | Response time: ${Date.now() - now}ms`);
  }

  private getLogType(status: number): string {
    const key = `${status.toString()[0]}xx`;
    return this.logType[key];
  }

  // NEW RESPONSE HELPER
  private successHttpResponse(res: Response, statusCode = HttpStatus.OK): (entity: any) => void {
    return (entity) => {
      if (entity) res.status(statusCode).json(entity);
    };
  }

  private errorHttpResponse(res: Response, statusCode = HttpStatus.INTERNAL_SERVER_ERROR): (error: Error) => void {
    return (error) => {
      if (error)
        res.status(statusCode).json({
          error: error.name,
          message: error.message,
        });
    };
  }
}
