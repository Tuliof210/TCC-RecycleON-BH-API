import { CreateUserDTO, UserViewDTO } from 'src/DTO';
import { ICreateUserController, ICreateUserService, CREATE_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(@Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService) {}

  @Post()
  handle(@Body() userData: CreateUserDTO): Promise<StandardSuccess<UserViewDTO> | StandardError> {
    return this.createUserService
      .execute(userData)
      .then((createdUser) => new StandardSuccess<UserViewDTO>(201, createdUser))
      .catch((err) => new StandardError(400, err));
  }
}
