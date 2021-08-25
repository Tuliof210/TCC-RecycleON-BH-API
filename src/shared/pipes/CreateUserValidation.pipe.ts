import { CreateUserDTO } from 'src/shared/DTO';

import { PipeTransform, Injectable } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<CreateUserDTO> = yup.object({
    name: yup.string().strict().required(),
    email: yup.string().strict().email().required(),
    password: yup.string().strict().min(10).required(),
  });

  async transform(body: Record<string, unknown>) {
    const validBody = await this.schema.validate(body);
    return this.schema.cast(validBody, { stripUnknown: true });
    //throw new UnauthorizedException();
  }
}
