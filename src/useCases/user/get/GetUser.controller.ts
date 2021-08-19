import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { GetUserService } from './GetUser.service';
import { ResponseHelper } from 'src/helpers/Response.helper';

@Controller('users')
export class GetUserController {
  constructor(private readonly responseHelper: ResponseHelper, private readonly getUserService: GetUserService) {}

  @Get(':id')
  async handle(@Param('id') id: string, @Res() res: Response): Promise<void> {
    return this.getUserService
      .execute(id)
      .then(this.responseHelper.notFound(res, `User ${id} not found`))
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
