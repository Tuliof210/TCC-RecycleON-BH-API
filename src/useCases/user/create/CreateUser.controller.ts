import { Body, Controller, Post, Res, Inject } from '@nestjs/common';

import { CreateUserDTO } from './CreateUser.DTO';
import { CREATE_USER_SERVICE, ICreateUserService, ICreateUserController } from './index';

import { Response } from 'express';
import { ResponseHelper } from 'src/helpers/Response.helper';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(
    private readonly responseHelper: ResponseHelper,
    @Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  async handle(@Body() createUserDTO: CreateUserDTO, @Res() res: Response): Promise<void> {
    return this.createUserService
      .execute(createUserDTO)
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
