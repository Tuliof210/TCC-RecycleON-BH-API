import { CreateUserDTO, UpdateUserDTO } from 'src/DTO';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

@Injectable()
export class TypeValidationMiddleware implements NestMiddleware {
  private responseShortcut: Response;
  private readonly coverageMap = {
    '/users': { POST: 'usersPostValidation', PUT: 'userPutValidation' },
  };

  // TODO fix all

  use(req: Request, res: Response, next: NextFunction) {
    this.responseShortcut = res;
    const { body, baseUrl, method } = req;

    console.log({ body: req.body });
    if (req.body) req.body = this.requestBodyHandler(body, baseUrl, method);
    console.log({ body: req.body });

    next();
  }

  // TODO fix throw
  private executeValidation<Type>(body: any, schema: yup.SchemaOf<Type>) {
    return schema.cast(body, { stripUnknown: true });
    // try {
    //   await schema.validate(body);
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   return schema.cast(body, { stripUnknown: true });
    // }
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
