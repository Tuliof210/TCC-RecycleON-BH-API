import { UserViewDTO } from 'src/DTO';

import { IGetUserController, IGetUserService, GET_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Get, Inject, Param } from '@nestjs/common';

@Controller('users')
export class GetUserController implements IGetUserController {
  constructor(@Inject(GET_USER_SERVICE) private readonly getUserService: IGetUserService) {}

  @Get(':id')
  async handle(@Param('id') userId: string): Promise<StandardSuccess<UserViewDTO>> {
    try {
      const foundUser = await this.getUserService.execute(userId);
      return new StandardSuccess<UserViewDTO>(foundUser);
    } catch (e) {
      throw new StandardError(e, e.statusCode);
    }
  }
}
