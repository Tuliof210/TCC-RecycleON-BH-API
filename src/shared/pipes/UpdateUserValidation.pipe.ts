import { UpdateUserDTO } from 'src/shared/DTO';
import { EmailRegex, PasswordRegex } from 'src/shared/entities';

import { PipeTransform, Injectable } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class UpdateUserValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<UpdateUserDTO> = yup.object({
    name: yup.string().strict().notRequired(),
    email: yup.string().strict().matches(EmailRegex, 'Invalid e-mail').notRequired(),
    password: yup.string().strict().matches(PasswordRegex, 'Invalid password').notRequired(),
    role: yup.string().strict().notRequired(),
    bookmarks: yup.array().of(yup.string()).strict().notRequired(),
  });

  async transform(body: Record<string, unknown>) {
    const validBody = await this.schema.validate(body);
    const castObject = this.schema.cast(validBody, { stripUnknown: true });

    return castObject;
  }
}
