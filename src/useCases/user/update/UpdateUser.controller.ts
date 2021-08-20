import { UpdateUserDTO } from 'src/DTO';
import { IUpdateUserController } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Body, Controller, Put, Inject, Param, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class UpdateUserController implements IUpdateUserController {
  constructor(@Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() userChanges: UpdateUserDTO, @Res() res: Response): Promise<void> {
    return this.responseHelper.failure(res)(new Error(`${id} | use case "update user" in progress`));
  }
}
