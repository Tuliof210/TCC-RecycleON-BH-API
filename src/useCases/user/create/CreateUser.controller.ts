import { Body, Controller, Post, Res } from '@nestjs/common';

import { CreateUserDTO } from './CreateUser.DTO';
import { ICreateUserController, ICreateUserService } from '.';

import { Response } from 'express';
import { ResponseHelper } from 'src/helpers/Response.helper';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly responseHelper: ResponseHelper,
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  async handle(@Body() createUserDTO: CreateUserDTO, @Res() res: Response): Promise<void> {
    return this.createUserService
      .execute(createUserDTO)
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
