import { CreateUserDTO } from 'src/DTO';
import { StandardError } from 'src/classes';

import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<CreateUserDTO> = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
  });

  async transform(body: any) {
    try {
      const validBody = await this.schema.validate(body);
      return this.schema.cast(validBody, { stripUnknown: true });
    } catch (e) {
      throw new StandardError(e, e.statusCode ?? HttpStatus.FORBIDDEN);
    }
  }
}
