import { Controller, Inject, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { RESPONSE_HELPER, IResponseHelper } from 'src/helpers';

import { GetUserService } from './GetUser.service';

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
