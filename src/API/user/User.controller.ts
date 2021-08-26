import { CreateUserDTO, UpdateUserDTO, UserViewDTO } from 'src/shared/DTO';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { CreateUserValidationPipe, UpdateUserValidationPipe } from 'src/shared/pipes';
import { IUserController, IUserService } from '.';

import { UserRole } from 'src/shared/entities';
import { Role } from 'src/shared/decorators';

import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController implements IUserController {
  constructor(@Inject('UserService') private readonly userService: IUserService) {}

  //TODO test auth and role

  @Post()
  create(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    return this.userService.create(userData);
  }

  @Put(':id')
  @Role(UserRole.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') userId: string, @Body(new UpdateUserValidationPipe()) userChanges: UpdateUserDTO) {
    return this.userService.update(userId, userChanges);
  }

  @Get()
  @Role(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  retrieve(@Query() userQuery: any) {
    //TODO remove this 'any' type
    return this.userService.retrieve(userQuery);
  }

  @Get('me')
  @Role(UserRole.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  getMe(@Request() { user }: { user: UserViewDTO }) {
    return this.userService.getById(user._id);
  }

  @Get(':id')
  @Role(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  getById(@Param('id') userId: string) {
    return this.userService.getById(userId);
  }

  @Delete(':id')
  @Role(UserRole.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  disable(@Param('id') userId: string) {
    return this.userService.disable(userId);
  }

  @Delete(':id/delete')
  @Role(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') userId: string) {
    return this.userService.delete(userId);
  }
}
