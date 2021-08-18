import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserService } from './CreateUser.service';
import { ResponseHelper } from 'src/helpers/Response.helper';

import { ICreateUserDTO } from './CreateUser.DTO';

@Controller('users')
export class CreateUserController {
  constructor(private readonly responseHelper: ResponseHelper, private readonly createUserService: CreateUserService) {}

  @Post()
  async handle(@Body() createUserDTO: ICreateUserDTO, @Res() res: Response): Promise<void> {
    return this.createUserService
      .execute(createUserDTO)
      .then(this.responseHelper.success(res))
      .catch(this.responseHelper.failure(res));
  }
}
