import { UserViewDTO } from 'src/DTO';
import { IDisableUserController, IDisableUserService, DISABLE_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Delete, Inject, Param } from '@nestjs/common';

@Controller('users')
export class DisableUserController implements IDisableUserController {
  constructor(@Inject(DISABLE_USER_SERVICE) private readonly disableUserService: IDisableUserService) {}

  @Delete(':id')
  handle(@Param('id') userId: string): Promise<StandardSuccess<void | UserViewDTO> | StandardError> {
    return this.disableUserService
      .execute(userId)
      .then((disabledUser) => new StandardSuccess<void | UserViewDTO>(disabledUser, 200))
      .catch((err) => new StandardError(err));
  }
}
