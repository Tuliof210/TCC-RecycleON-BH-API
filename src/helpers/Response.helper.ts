import { IResponseHelper } from '.';

import { Injectable, HttpStatus } from '@nestjs/common';

import { Response } from 'express';

@Injectable()
export class ResponseHelper implements IResponseHelper {
  public success<Type>(res: Response, statusCode = HttpStatus.OK): (entity: Type) => void {
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
