import { CreateUserDTO, UserViewDTO } from 'src/DTO';
import { ICreateUserController, ICreateUserService, CREATE_USER_SERVICE, CreateUserValidationPipe } from '.';

import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post, UsePipes } from '@nestjs/common';

@Controller('users')
export class CreateUserController implements ICreateUserController {
  constructor(@Inject(CREATE_USER_SERVICE) private readonly createUserService: ICreateUserService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new CreateUserValidationPipe())
  async handle(@Body() userData: CreateUserDTO): Promise<UserViewDTO> {
    try {
      return this.createUserService.execute(userData);
    } catch (e) {
      console.log(e);
      throw new HttpException({ name: e.name, message: e.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
