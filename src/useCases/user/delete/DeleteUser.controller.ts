import { IDeleteUserController } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Controller, Delete, Inject, Param, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class DeleteUserController implements IDeleteUserController {
  constructor(@Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper) {}

  @Delete(':id/delete')
  async handle(@Param('id') userId: string, @Res() res: Response): Promise<void> {
    return this.responseHelper.failure(res)(new Error(`${userId} | use case "delete user" in progress`));
  }
}
