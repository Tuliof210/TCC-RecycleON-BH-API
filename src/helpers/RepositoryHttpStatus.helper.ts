import { IRepositoryHttpStatusHelper } from '.';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryHttpStatusHelper implements IRepositoryHttpStatusHelper {
  getError(error: Error) {
    if (error.name == 'MongooseServerSelectionError') return 503;
    if (error.name == 'ValidationError') return 403;
    if (error.name == 'CastError') return 400;
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
