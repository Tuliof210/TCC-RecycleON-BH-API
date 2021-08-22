import { IRepositoryHttpStatusHelper } from '.';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryHttpStatusHelper implements IRepositoryHttpStatusHelper {
  private readonly errorMap = {
    'Not Found': 404,
    MongooseServerSelectionError: 503,
    ValidationError: 403,
    CastError: 400,
  };
  getError(error: Error) {
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
}
