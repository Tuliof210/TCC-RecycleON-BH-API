import { UserViewDTO } from 'src/DTO';
import { IDeleteUserController, IDeleteUserService, DELETE_USER_SERVICE } from '.';

import { Controller, Delete, HttpException, HttpStatus, Inject, Param } from '@nestjs/common';

@Controller('users')
export class DeleteUserController implements IDeleteUserController {
  constructor(@Inject(DELETE_USER_SERVICE) private readonly deleteUserService: IDeleteUserService) {}

  @Delete(':id/delete')
  async handle(@Param('id') userId: string): Promise<UserViewDTO> {
    try {
      return this.deleteUserService.execute(userId);
    } catch (e) {
      throw new HttpException({ name: e.name, message: e.message }, e.statusCode ?? HttpStatus.BAD_REQUEST);
    }
  }
}
