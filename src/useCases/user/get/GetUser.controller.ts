import { UserViewDTO } from 'src/DTO';
import { IGetUserController, IGetUserService, GET_USER_SERVICE } from '.';

import { Controller, Get, Inject, Param } from '@nestjs/common';

@Controller('users')
export class GetUserController implements IGetUserController {
  constructor(@Inject(GET_USER_SERVICE) private readonly getUserService: IGetUserService) {}

  @Get(':id')
  handle(@Param('id') userId: string): Promise<UserViewDTO> {
    return this.getUserService.execute(userId);
  }
}
