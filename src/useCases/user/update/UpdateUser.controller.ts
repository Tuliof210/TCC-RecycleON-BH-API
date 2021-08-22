import { UserViewDTO, UpdateUserDTO } from 'src/DTO';
import { IUpdateUserController, IUpdateUserService, UPDATE_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Body, Controller, Put, Inject, Param } from '@nestjs/common';

@Controller('users')
export class UpdateUserController implements IUpdateUserController {
  constructor(@Inject(UPDATE_USER_SERVICE) private readonly updateUserService: IUpdateUserService) {}

  //TODO add a middleware validation for userData [type checking for "UpdateUserDTO" not working]
  @Put(':id')
  handle(
    @Param('id') userId: string,
    @Body() userChanges: UpdateUserDTO,
  ): Promise<StandardSuccess<UserViewDTO> | StandardError> {
    return this.updateUserService
      .execute(userId, userChanges)
      .then((updatedUser) => new StandardSuccess<UserViewDTO>(updatedUser))
      .catch((e) => new StandardError(e, e.statusCode));
  }
}
