import { UpdateUserDTO } from 'src/DTO';
import { IUpdateUserController, IUpdateUserService, UPDATE_USER_SERVICE } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Body, Controller, Put, Inject, Param, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class UpdateUserController implements IUpdateUserController {
  constructor(
    @Inject(UPDATE_USER_SERVICE) private readonly updateUserService: IUpdateUserService,
    @Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper,
  ) {}

  @Put(':id')
  handle(@Param('id') userId: string, @Body() userChanges: UpdateUserDTO, @Res() res: Response): Promise<void> {
    return this.updateUserService
      .execute(userId, userChanges)
      .then(this.responseHelper.notFound(res, `User ${userId} not found`))
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
