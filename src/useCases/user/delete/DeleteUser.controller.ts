import { UserViewDTO } from 'src/DTO';
import { IDeleteUserController, IDeleteUserService, DELETE_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Delete, Inject, Param } from '@nestjs/common';

@Controller('users')
export class DeleteUserController implements IDeleteUserController {
  constructor(@Inject(DELETE_USER_SERVICE) private readonly deleteUserService: IDeleteUserService) {}

  @Delete(':id/delete')
  handle(@Param('id') userId: string): Promise<StandardSuccess<void | UserViewDTO> | StandardError> {
    return this.deleteUserService
      .execute(userId)
      .then((deletedUser) => new StandardSuccess<void | UserViewDTO>(deletedUser))
      .catch((err) => new StandardError(err));
  }
}
