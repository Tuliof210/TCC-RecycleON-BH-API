import { IDisableUserController, IDisableUserService, DISABLE_USER_SERVICE } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Controller, Delete, Inject, Param, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class DisableUserController implements IDisableUserController {
  constructor(
    @Inject(DISABLE_USER_SERVICE) private readonly disableUserService: IDisableUserService,
    @Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper,
  ) {}

  @Delete(':id')
  handle(@Param('id') userId: string, @Res() res: Response): Promise<void> {
    return this.disableUserService
      .execute(userId)
      .then(this.responseHelper.notFound(res, `User ${userId} not found`))
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
