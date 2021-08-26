import { CreateUserDTO, UpdateUserDTO, UserViewDTO } from 'src/shared/DTO';
import { masterConstants } from 'src/constants';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { CreateUserValidationPipe, UpdateUserValidationPipe } from 'src/shared/pipes';
import { IUserController, IUserService, IUserServiceToken } from '.';

import { UserRole } from 'src/shared/entities';
import { Role } from 'src/shared/decorators';

import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

@Controller('users')
export class UserController implements IUserController {
  constructor(@Inject(IUserServiceToken) private readonly userService: IUserService) {}

  @Post()
  create(@Headers('masterKey') masterKey: string, @Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    //TODO if you have some time, create a 'masterStrategy'
    if (masterKey !== masterConstants.masterKey) throw new UnauthorizedException();
    return this.userService.create(userData);
  }

  @Patch('me')
  @Role(UserRole.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateMe(
    @Request() { user }: { user: UserViewDTO },
    @Body(new UpdateUserValidationPipe()) userChanges: UpdateUserDTO,
  ) {
    return this.userService.update(user._id, userChanges);
  }

  @Patch(':id')
  @Role(UserRole.Admin)
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
  get(@Param('id') userId: string) {
    return this.userService.getById(userId);
  }

  @Delete('me')
  @Role(UserRole.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  disableMe(@Request() { user }: { user: UserViewDTO }) {
    return user.disable();
  }

  @Delete(':id')
  @Role(UserRole.Admin)
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
