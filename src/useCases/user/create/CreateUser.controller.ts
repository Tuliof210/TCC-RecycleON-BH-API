import { ICreateUserController, ICreateUserService, CreateUserDTO, CREATE_USER_SERVICE } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Body, Controller, Inject, Post, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(
    @Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService,
    @Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper,
  ) {}

  @Post()
  async handle(@Body() createUserDTO: CreateUserDTO, @Res() res: Response): Promise<void> {
    return this.createUserService
      .execute(createUserDTO)
      .then(this.responseHelper.success(res))
      .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
