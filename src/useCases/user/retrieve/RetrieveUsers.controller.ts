import { UserViewDTO } from 'src/DTO';
import { IRetrieveUsersController, IRetrieveUsersService, RETRIEVE_USERS_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Get, Inject, Query } from '@nestjs/common';

@Controller('users')
export class RetrieveUsersController implements IRetrieveUsersController {
  constructor(@Inject(RETRIEVE_USERS_SERVICE) private readonly retrieveUsersService: IRetrieveUsersService) {}

  @Get()
  handle(
    @Query() userQuery: any,
  ): Promise<StandardSuccess<void | { count: number; list: UserViewDTO[] }> | StandardError> {
    return this.retrieveUsersService
      .execute(userQuery)
      .then((retrievedUsers) => new StandardSuccess<void | { count: number; list: UserViewDTO[] }>(retrievedUsers))
      .catch((err) => new StandardError(err));
  }
}
