import { ILoggerHelper, ILoggerHelperToken } from 'src/shared/helpers';

import { CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//TODO fix complexity
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(@Inject(ILoggerHelperToken) private readonly loggerHelper: ILoggerHelper) {}

  private readonly errorMap = new Map([
    ['CastError', 400],
    ['UnauthorizedException', 401],
    ['ValidationError', 403],
    ['Not Found', 404],
    ['MongooseServerSelectionError', 503],
  ]);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result) => {
        this.loggerHelper.log(req, res.statusCode ?? 200, now);
        return result;
      }),
      catchError((e) => {
        const error = new HttpException({ name: e.name, message: e.message }, this.getErrorStatusCode(e));

        this.loggerHelper.log(req, error.getStatus() ?? 500, now);
        return throwError(() => error);
      }),
    );
  }

  private getErrorStatusCode(error: Error) {
    if (this.errorMap.get(error.name)) return this.errorMap.get(error.name);
    if (error.name == 'MongoError' && error.message.includes('E11000 duplicate key error')) return 409;
    if (
      error.name == 'MongoError' &&
      error.message.includes('Performing an update on the path') &&
      error.message.includes('would modify the immutable field')
    )
      return 400;
    return 500;
  }
}
