import { LoginDTO } from 'src/DTO';

import { PipeTransform, Injectable } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class LoginValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<LoginDTO> = yup.object({
    email: yup.string().strict().email().required(),
    password: yup.string().strict().min(10).required(),
  });

  async transform(body: any) {
    const validBody = await this.schema.validate(body);
    return this.schema.cast(validBody, { stripUnknown: true });
    //throw new UnauthorizedException();
  }
}
