import { UserViewDTO, UpdateUserDTO } from 'src/DTO';
import { IUpdateUserController, IUpdateUserService, UPDATE_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Body, Controller, Put, Inject, Param } from '@nestjs/common';

@Controller('users')
export class UpdateUserController implements IUpdateUserController {
  constructor(@Inject(UPDATE_USER_SERVICE) private readonly updateUserService: IUpdateUserService) {}

  @Put(':id')
  async handle(@Param('id') userId: string, @Body() userChanges: UpdateUserDTO): Promise<StandardSuccess<UserViewDTO>> {
    try {
      const updatedUser = await this.updateUserService.execute(userId, userChanges);
      return new StandardSuccess<UserViewDTO>(updatedUser);
    } catch (e) {
      throw new StandardError(e, e.statusCode);
    }
  }
}
