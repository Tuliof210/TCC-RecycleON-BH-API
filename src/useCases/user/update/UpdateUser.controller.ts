import { UserViewDTO, UpdateUserDTO } from 'src/DTO';
import { IUpdateUserController, IUpdateUserService, UPDATE_USER_SERVICE, UpdateUserValidationPipe } from '.';

import { Body, Controller, Put, Inject, Param } from '@nestjs/common';

@Controller('users')
export class UpdateUserController implements IUpdateUserController {
  constructor(@Inject(UPDATE_USER_SERVICE) private readonly updateUserService: IUpdateUserService) {}

  @Put(':id')
  handle(
    @Param('id') userId: string,
    @Body(new UpdateUserValidationPipe()) userChanges: UpdateUserDTO,
  ): Promise<UserViewDTO> {
    return this.updateUserService.execute(userId, userChanges);
  }
}
