import { IDeleteUserController, IDeleteUserService, DELETE_USER_SERVICE } from '.';

import { Controller, Delete, Inject, Param } from '@nestjs/common';

@Controller('users')
export class DeleteUserController implements IDeleteUserController {
  constructor(@Inject(DELETE_USER_SERVICE) private readonly deleteUserService: IDeleteUserService) {}

  @Delete(':id/delete')
  handle(@Param('id') userId: string) {
    return this.deleteUserService.execute(userId);
  }
}
