import { UserViewDTO } from 'src/DTO';
import { IRetrieveUsersController, IRetrieveUsersService, RETRIEVE_USERS_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Get, Inject, Query } from '@nestjs/common';

@Controller('users')
export class RetrieveUsersController implements IRetrieveUsersController {
  constructor(@Inject(RETRIEVE_USERS_SERVICE) private readonly retrieveUsersService: IRetrieveUsersService) {}

  @Get()
  async handle(@Query() userQuery: any): Promise<StandardSuccess<{ count: number; list: UserViewDTO[] }>> {
    try {
      const retrievedUsers = await this.retrieveUsersService.execute(userQuery);
      return new StandardSuccess<{ count: number; list: UserViewDTO[] }>(retrievedUsers);
    } catch (e) {
      throw new StandardError(e, e.statusCode);
    }
  }
}
