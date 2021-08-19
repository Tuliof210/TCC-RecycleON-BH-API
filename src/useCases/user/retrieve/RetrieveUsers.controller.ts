import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { RetrieveUsersService } from './RetrieveUsers.service';
import { ResponseHelper } from 'src/helpers/Response.helper';

@Controller('users')
export class RetrieveUsersController {
  constructor(
    private readonly responseHelper: ResponseHelper,
    private readonly retrieveUsersService: RetrieveUsersService,
  ) {}

  @Get()
  async handle(@Query() query: any, @Res() res: Response): Promise<void> {
    return this.retrieveUsersService
      .execute(query)
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
