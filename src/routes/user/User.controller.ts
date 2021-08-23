import { CreateUserDTO, UpdateUserDTO } from 'src/DTO';
import { CreateUserValidationPipe, UpdateUserValidationPipe } from 'src/pipes';
import { IUserController } from '.';
import { IUserService, USER_SERVICE } from 'src/services';

import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class UserController implements IUserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  @Post()
  @HttpCode(201)
  create(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(@Param('id') userId: string, @Body(new UpdateUserValidationPipe()) userChanges: UpdateUserDTO) {
    return this.userService.update(userId, userChanges);
  }

  @Get()
  retrieve(@Query() userQuery: any) {
    return this.userService.retrieve(userQuery);
  }

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return this.userService.getOne(userId);
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
