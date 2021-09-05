import { CreateUserDTO } from 'src/shared/DTO';
import { EmailRegex, PasswordRegex } from 'src/shared/entities';

import { PipeTransform, Injectable } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<CreateUserDTO> = yup.object({
    name: yup.string().strict().required(),
    email: yup.string().strict().matches(EmailRegex, 'Invalid e-mail').required(),
    password: yup
      .string()
      .strict()
      .matches(PasswordRegex, 'Invalid password. Minimum 6 characters, at least one letter and one number')
      .required(),
  });

  async transform(body: Record<string, unknown>): Promise<CreateUserDTO> {
    const validBody = await this.schema.validate(body);
    return this.schema.cast(validBody, { stripUnknown: true });
  }
}
