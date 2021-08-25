import { CreateUserDTO, LocalAuthDTO, UpdateUserDTO } from 'src/shared/DTO';
import { JwtAuthGuard } from 'src/guards';
import { CreateUserValidationPipe, UpdateUserValidationPipe } from 'src/shared/pipes';
import { IUserController, IUserService } from '.';

import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController implements IUserController {
  constructor(@Inject('UserService') private readonly userService: IUserService) {}

  @Post()
  create(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(@Param('id') userId: string, @Body(new UpdateUserValidationPipe()) userChanges: UpdateUserDTO) {
    return this.userService.update(userId, userChanges);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  retrieve(@Query() userQuery: any) {
    //TODO remove this 'any' type
    return this.userService.retrieve(userQuery);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() { user }: { user: LocalAuthDTO }) {
    console.log({ me: user });
    return this.userService.getById(user._id);
  }

  @Get(':id')
  getById(@Param('id') userId: string) {
    return this.userService.getById(userId);
  }

  @Delete(':id')
  disable(@Param('id') userId: string) {
    return this.userService.disable(userId);
  }

  @Delete(':id/delete')
  delete(@Param('id') userId: string) {
    return this.userService.delete(userId);
  }
}
