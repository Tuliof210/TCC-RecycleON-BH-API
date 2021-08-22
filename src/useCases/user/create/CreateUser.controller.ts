import { CreateUserDTO, UserViewDTO } from 'src/DTO';
import { ICreateUserController, ICreateUserService, CREATE_USER_SERVICE, CreateUserValidationPipe } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(@Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async handle(@Body() userData: CreateUserDTO): Promise<StandardSuccess<UserViewDTO>> {
    try {
      const createdUser = await this.createUserService.execute(userData);
      return new StandardSuccess<UserViewDTO>(createdUser, 201);
    } catch (e) {
      throw new StandardError(e, e.statusCode);
    }
  }
}
