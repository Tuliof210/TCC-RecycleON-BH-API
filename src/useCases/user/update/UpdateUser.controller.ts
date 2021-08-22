import { UserViewDTO, UpdateUserDTO } from 'src/DTO';
import { IUpdateUserController, IUpdateUserService, UPDATE_USER_SERVICE } from '.';

import { Body, Controller, Put, Inject, Param } from '@nestjs/common';

@Controller('users')
export class UpdateUserController implements IUpdateUserController {
  constructor(@Inject(UPDATE_USER_SERVICE) private readonly updateUserService: IUpdateUserService) {}

  @Put(':id')
  handle(@Param('id') userId: string, @Body() userChanges: UpdateUserDTO): Promise<UserViewDTO> {
    return this.updateUserService.execute(userId, userChanges);
  }
}
