import { UserViewDTO } from 'src/DTO';
import { IDisableUserController, IDisableUserService, DISABLE_USER_SERVICE } from '.';
import { StandardSuccess, StandardError } from 'src/classes';

import { Controller, Delete, Inject, Param } from '@nestjs/common';

@Controller('users')
export class DisableUserController implements IDisableUserController {
  constructor(@Inject(DISABLE_USER_SERVICE) private readonly disableUserService: IDisableUserService) {}

  @Delete(':id')
  async handle(@Param('id') userId: string): Promise<StandardSuccess<UserViewDTO>> {
    try {
      const disabledUser = await this.disableUserService.execute(userId);
      return new StandardSuccess<UserViewDTO>(disabledUser);
    } catch (e) {
      throw new StandardError(e, e.statusCode);
    }
  }
}
