import { SocialUserDTO } from 'src/shared/DTO';
import { EmailRegex } from 'src/shared/entities';

import { PipeTransform, Injectable } from '@nestjs/common';

import * as yup from 'yup';

@Injectable()
export class CreateSocialUserValidationPipe implements PipeTransform {
  private readonly schema: yup.SchemaOf<SocialUserDTO> = yup.object({
    id: yup.string().strict().required(),
    name: yup.string().strict().required(),
    email: yup.string().strict().matches(EmailRegex, 'Invalid e-mail').required(),
  });

  async transform(body: Record<string, unknown>): Promise<SocialUserDTO> {
    const validBody = await this.schema.validate(body);
    return this.schema.cast(validBody, { stripUnknown: true });
  }
}
