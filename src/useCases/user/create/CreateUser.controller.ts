import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { IResponse } from 'src/interfaces/IResponse';

import { ICreateUserDTO } from './CreateUser.DTO';

import { CreateUserService } from './CreateUser.service';

@Controller('users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async onCreate(@Body() createUserDTO: ICreateUserDTO): Promise<IResponse> {
    const user = await this.createUserService.execute(createUserDTO);
    return {
      message: 'sucesso ao criar usuário',
      data: user,
    };
  }
}
