import { UserViewDTO } from 'src/DTO';
import { IRetrieveUsersController, IRetrieveUsersService, RETRIEVE_USERS_SERVICE } from '.';

import { Controller, Get, Inject, Query } from '@nestjs/common';

@Controller('users')
export class RetrieveUsersController implements IRetrieveUsersController {
  constructor(@Inject(RETRIEVE_USERS_SERVICE) private readonly retrieveUsersService: IRetrieveUsersService) {}

  @Get()
  handle(@Query() userQuery: any): Promise<{ count: number; list: UserViewDTO[] }> {
    return this.retrieveUsersService.execute(userQuery);
  }
}
