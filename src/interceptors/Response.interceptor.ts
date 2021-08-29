import { ILoggerHelper, ILoggerHelperToken } from 'src/shared/helpers';

import { CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from '@nestjs/common';

import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//TODO fix complexity
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(@Inject(ILoggerHelperToken) private readonly loggerHelper: ILoggerHelper) {}

  private readonly errorMap = new Map([
    ['CastError', 400],
    ['Not Found', 404],
    ['MongooseServerSelectionError', 503],
    ['UnauthorizedException', 401],
    ['ValidationError', 403],
  ]);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(map(this.handleSuccess(now, req, res.statusCode)), catchError(this.handleError(now, req)));
  }

  private handleSuccess(now: number, req: Request, statusCode = 200) {
    return (result: unknown) => {
      this.loggerHelper.log(req, statusCode, now);
      return result;
    };
  }
  private handleError(now: number, req: Request) {
    return (e: Error) => {
      const error = new HttpException({ name: e.name, message: e.message }, this.getErrorStatusCode(e));

      console.log({ before: e, after: error });

      this.loggerHelper.log(req, error.getStatus() ?? 500, now);
      return throwError(() => error);
    };
  }

  private getErrorStatusCode(error: Error) {
    if (error.name == 'MongoError') return this.getMongoErrorStatusCode(error.message);
    return this.errorMap.has(error.name) ? this.errorMap.get(error.name) : 500;
  }

  private getMongoErrorStatusCode(message: string) {
    if (message.includes('E11000 duplicate key error')) return 409;
    return 400;
  }
}
