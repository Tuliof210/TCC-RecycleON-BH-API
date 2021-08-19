import { IRetrieveUsersController, IRetrieveUsersService, RETRIEVE_USERS_SERVICE } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Controller, Get, Inject, Query, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class RetrieveUsersController implements IRetrieveUsersController {
  constructor(
    @Inject(RETRIEVE_USERS_SERVICE) private readonly retrieveUsersService: IRetrieveUsersService,
    @Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper,
  ) {}

  @Get()
  async handle(@Query() query: any, @Res() res: Response): Promise<void> {
    return this.retrieveUsersService
      .execute(query)
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
