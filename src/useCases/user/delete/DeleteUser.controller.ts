import { UserViewDTO } from 'src/DTO';
import { IDeleteUserController, IDeleteUserService, DELETE_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Delete, Inject, Param } from '@nestjs/common';

@Controller('users')
export class DeleteUserController implements IDeleteUserController {
  constructor(@Inject(DELETE_USER_SERVICE) private readonly deleteUserService: IDeleteUserService) {}

  @Delete(':id/delete')
  async handle(@Param('id') userId: string): Promise<StandardSuccess<UserViewDTO>> {
    try {
      const deletedUser = await this.deleteUserService.execute(userId);
      return new StandardSuccess<UserViewDTO>(deletedUser);
    } catch (e) {
      throw new StandardError(e, e.statusCode);
    }
  }
}
