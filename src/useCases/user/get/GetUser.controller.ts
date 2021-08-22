import { UserViewDTO } from 'src/DTO';

import { IGetUserController, IGetUserService, GET_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Get, Inject, Param } from '@nestjs/common';

@Controller('users')
export class GetUserController implements IGetUserController {
  constructor(@Inject(GET_USER_SERVICE) private readonly getUserService: IGetUserService) {}

  @Get(':id')
  handle(@Param('id') userId: string): Promise<StandardSuccess<UserViewDTO> | StandardError> {
    return this.getUserService
      .execute(userId)
      .then((foundUser) => new StandardSuccess<UserViewDTO>(foundUser))
      .catch((e) => new StandardError(e, e.statusCode));
  }
}
