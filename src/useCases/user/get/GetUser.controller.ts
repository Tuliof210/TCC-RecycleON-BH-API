import { GetUserService } from './GetUser.service';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Controller, Get, Inject, Param, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class GetUserController {
  constructor(
    @Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper,
    private readonly getUserService: GetUserService,
  ) {}

  @Get(':id')
  async handle(@Param('id') id: string, @Res() res: Response): Promise<void> {
    return this.getUserService
      .execute(id)
      .then(this.responseHelper.notFound(res, `User ${id} not found`))
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
