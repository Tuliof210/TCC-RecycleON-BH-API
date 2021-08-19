import { CreateUserDTO } from './CreateUser.DTO';
import { CREATE_USER_SERVICE, ICreateUserController, ICreateUserService } from '.';
import { ResponseHelper } from 'src/helpers/Response.helper';

import { Controller, Inject, Post, Body, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(
    @Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Post()
  async handle(@Body() createUserDTO: CreateUserDTO, @Res() res: Response): Promise<void> {
    return this.createUserService
      .execute(createUserDTO)
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
