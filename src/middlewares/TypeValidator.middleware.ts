import { CreateUserDTO, UpdateUserDTO } from 'src/DTO';
import { ResponseHelper } from 'src/helpers';

import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

@Injectable()
export class TypeValidationMiddleware implements NestMiddleware {
  private responseHelper: ResponseHelper;
  private responseShortcut: Response;
  private readonly coverageMap = {
    '/users': { POST: 'usersPostValidation', PUT: 'userPutValidation' },
  };

  constructor() {
    this.responseHelper = new ResponseHelper();
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.responseShortcut = res;
    const { body, baseUrl, method } = req;
    if (req.body) req.body = this.requestBodyHandler(body, baseUrl, method);

    next();
  }

  private executeValidation<Type>(body: any, schema: yup.SchemaOf<Type>) {
    return schema
      .validate(body)
      .then(() => schema.cast(body, { stripUnknown: true }))
      .catch((err) => {
        console.log(err);
        console.log(err.errors);
        //throw { error: 'a', message: e.errors[0] };
        return this.responseHelper.failure(this.responseShortcut, HttpStatus.BAD_REQUEST)(err);
      });
  }

  private requestBodyHandler(body: any, baseUrl: string, method: string) {
    const handler = this.coverageMap[baseUrl][method] as string;
    return handler && this[handler] ? this[handler](body) : body;
  }

  private usersPostValidation(body: any) {
    const schema: yup.SchemaOf<CreateUserDTO> = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    });
    return this.executeValidation<CreateUserDTO>(body, schema);
  }

  private userPutValidation(body: any) {
    const schema: yup.SchemaOf<UpdateUserDTO> = yup.object({
      name: yup.string().required(),
    });
    return this.executeValidation<UpdateUserDTO>(body, schema);
  }
}
