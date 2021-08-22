import { CreateUserDTO, UpdateUserDTO } from 'src/DTO';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

@Injectable()
export class BodyValidationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { body, baseUrl, method } = req;

    if (req.body) {
      req.body = this.handleRequestBody(body, baseUrl, method);
    }
    next();
  }

  private handleRequestBody(body: Record<string, unknown>, baseUrl: string, method: string) {
    const handler = this.coverageMap[baseUrl][method];
    return handler ? handler(body) : body;
  }

  private readonly coverageMap = {
    '/users': {
      POST: (body: Record<string, unknown>) => {
        const schema: yup.SchemaOf<CreateUserDTO> = yup.object({
          name: yup.mixed(),
          email: yup.mixed(),
          password: yup.mixed(),
        });
        return this.castBodyRequest<CreateUserDTO>(body, schema);
      },
      PUT: (body: Record<string, unknown>) => {
        const schema: yup.SchemaOf<UpdateUserDTO> = yup.object({
          name: yup.mixed(),
        });
        return this.castBodyRequest<UpdateUserDTO>(body, schema);
      },
    },
  };

  private castBodyRequest<Type>(body: any, schema: yup.SchemaOf<Type>) {
    return schema.cast(body, { stripUnknown: true });
  }
}
