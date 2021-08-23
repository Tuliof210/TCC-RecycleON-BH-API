import { CreateUserDTO } from 'src/DTO';
import { CreateUserValidationPipe } from 'src/pipes';
import { ICreateUserController, ICreateUserService, CREATE_USER_SERVICE } from '.';

import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(@Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService) {}

  @Post()
  @HttpCode(201)
  handle(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    return this.createUserService.execute(userData);
  }
}
