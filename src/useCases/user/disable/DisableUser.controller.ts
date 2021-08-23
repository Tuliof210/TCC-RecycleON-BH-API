import { IDisableUserController, IDisableUserService, DISABLE_USER_SERVICE } from '.';

import { Controller, Delete, Inject, Param } from '@nestjs/common';

@Controller('users')
export class DisableUserController implements IDisableUserController {
  constructor(@Inject(DISABLE_USER_SERVICE) private readonly disableUserService: IDisableUserService) {}

  @Delete(':id')
  handle(@Param('id') userId: string) {
    return this.disableUserService.execute(userId);
  }
}
