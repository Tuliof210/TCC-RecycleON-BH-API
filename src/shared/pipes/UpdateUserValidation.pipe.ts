import { UpdateUserDTO } from 'src/shared/DTO';

import { PipeTransform, Injectable } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class UpdateUserValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<UpdateUserDTO> = yup.object({
    name: yup.string().strict().required(),
  });

  async transform(body: Record<string, unknown>) {
    const validBody = await this.schema.validate(body);
    return this.schema.cast(validBody, { stripUnknown: true });
  }
}
