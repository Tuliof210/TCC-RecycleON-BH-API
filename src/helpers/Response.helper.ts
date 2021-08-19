import { Response } from 'express';
import { HttpStatus, Injectable } from '@nestjs/common';

import { IResponseHelper } from '.';

@Injectable()
export class ResponseHelper implements IResponseHelper {
  public success<Type>(res: Response, statusCode = HttpStatus.CREATED): (entity: Type) => void {
    return (entity) => {
      if (entity) res.status(statusCode).json(entity);
    };
  }

  public failure(res: Response, statusCode = HttpStatus.INTERNAL_SERVER_ERROR): (error: Error) => void {
    return (error) => {
      if (error)
        res.status(statusCode).json({
          error: error.name,
          message: error.message,
        });
    };
  }

  public notFound<Type>(res: Response, message = ''): (entity: Type) => Type | void {
    return (entity) => {
      if (entity) return entity;
      res.status(HttpStatus.NOT_FOUND).json({
        error: 'Not Found',
        message,
      });
    };
  }
}
