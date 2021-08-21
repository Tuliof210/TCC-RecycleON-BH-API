import { CreateUserDTO, UpdateUserDTO } from 'src/DTO';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

@Injectable()
export class TypeValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(this, '14');

    const { body, baseUrl, method } = req;
    if (req.body) req.body = this.requestBodyHandler(body, baseUrl, method);

    next();
  }

  private readonly coverageMap = {
    '/users': { POST: this.usersPostValidation, PUT: this.userPutValidation },
  };

  private requestBodyHandler(body: any, baseUrl: string, method: string) {
    const handler = this.coverageMap[baseUrl][method];
    return handler ? handler(body) : body;
  }

  //TODO fix hardcoded yup
  private usersPostValidation(body: any) {
    const schema: yup.SchemaOf<CreateUserDTO> = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    });

    console.log(this, '35');

    return this.executeValidation(body, schema);
  }

  //TODO fix hardcoded yup
  private userPutValidation(body: any) {
    const schema: yup.SchemaOf<UpdateUserDTO> = yup.object({
      name: yup.string().required(),
    });

    return this.executeValidation(body, schema);
  }

  private executeValidation(body: any, schema) {
    console.log('hiii');

    try {
      schema.validateSync(body);
      schema.cast(body, { stripUnknown: true });
    } catch (error) {
      console.log(error);
      throw { name: 'a' };
    }
  }
}
