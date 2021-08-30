import { UpdateUserDTO } from 'src/shared/DTO';
import { EmailRegex } from 'src/shared/entities';

import { PipeTransform, Injectable } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class UpdateUserValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<UpdateUserDTO> = yup.object({
    name: yup.string().strict().notRequired(),
    email: yup.string().strict().matches(EmailRegex, 'Invalid e-mail').notRequired(),
    role: yup.string().strict().notRequired(),
  });

  async transform(body: Record<string, unknown>) {
    const validBody = await this.schema.validate(body);
    const castObject = this.schema.cast(validBody, { stripUnknown: true });

    return { name: castObject.name, email: castObject.email };
  }
}
