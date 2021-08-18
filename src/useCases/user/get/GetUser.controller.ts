import { Controller, Get, HttpCode, Param } from '@nestjs/common';

import { IResponse } from 'src/interfaces/IResponse';

import { GetUserService } from './GetUser.service';

@Controller('users')
export class GetUserController {
  constructor(private getUserService: GetUserService) {}

  @Get(':id')
  @HttpCode(200)
  async onGet(@Param('id') id): Promise<IResponse> {
    const user = await this.getUserService.execute(id);
    return {
      message: user ? 'usuário encontrado com sucesso' : 'usuário não encontrado',
      data: user,
    };
  }
}
