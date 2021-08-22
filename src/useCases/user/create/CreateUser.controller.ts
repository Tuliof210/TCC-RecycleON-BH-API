import { CreateUserDTO, UserViewDTO } from 'src/DTO';
import { ICreateUserController, ICreateUserService, CREATE_USER_SERVICE, CreateUserValidationPipe } from '.';

import { Body, Controller, HttpCode, Inject, Post, UsePipes } from '@nestjs/common';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(@Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService) {}

  @Post()
  @HttpCode(201)
  handle(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO): Promise<UserViewDTO> {
    return this.createUserService.execute(userData);
  }
}
