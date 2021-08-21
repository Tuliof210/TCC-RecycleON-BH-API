import { IDeleteUserController, IDeleteUserService, DELETE_USER_SERVICE } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Controller, Delete, Inject, Param, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class DeleteUserController implements IDeleteUserController {
  constructor(
    @Inject(DELETE_USER_SERVICE) private readonly deleteUserService: IDeleteUserService,
    @Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper,
  ) {}

  @Delete(':id/delete')
  handle(@Param('id') userId: string, @Res() res: Response): Promise<void> {
    return this.deleteUserService
      .execute(userId)
      .then(this.responseHelper.notFound(res, `User ${userId} not found`))
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
