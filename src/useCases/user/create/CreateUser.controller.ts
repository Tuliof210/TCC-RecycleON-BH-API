import { CreateUserDTO } from 'src/DTO';
import { ICreateUserController, ICreateUserService, CREATE_USER_SERVICE } from '.';
import { IResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { Body, Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common';

import { Response } from 'express';

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService,
    @Inject(RESPONSE_HELPER) private readonly responseHelper: IResponseHelper,
  ) {}

  @Post()
  handle(@Body() userData: CreateUserDTO) {
    return this.createUserService.execute(userData); //.catch((e) => e);
    // .then(this.responseHelper.success(res, HttpStatus.CREATED))
    // .catch((err) => this.responseHelper.failure(res, err.statusCode)(err));
  }
}
