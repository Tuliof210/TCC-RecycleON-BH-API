import { CreateUserDTO, QueryParamsDTO, UpdateUserDTO, UserDocumentDTO } from 'src/shared/DTO';
import { JwtAuthGuard, MasterKeyAuthGuard, RoleGuard } from 'src/guards';
import { CreateUserValidationPipe, QueryParamsNormalizationPipe, UpdateUserValidationPipe } from 'src/shared/pipes';
import { IUsersController, IUsersService, IUsersServiceToken } from '.';
import { IAuthServiceToken, IAuthService } from 'src/API/auth';
import { UserRole } from 'src/shared/entities';
import { Role } from 'src/shared/decorators';

import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController implements IUsersController {
  constructor(
    @Inject(IUsersServiceToken) private readonly usersService: IUsersService,
    @Inject(IAuthServiceToken) private readonly authService: IAuthService,
  ) {}

  @Post()
  @UseGuards(MasterKeyAuthGuard)
  async create(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    const user = await this.usersService.create(userData, true);
    const { token } = await this.authService.login({ _id: user._id, email: user.email, role: user.role });
    return { token, user };
  }

  @Patch('me')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  updateMe(
    @Request() { user }: { user: UserDocumentDTO },
    @Body(new UpdateUserValidationPipe()) userChanges: UpdateUserDTO,
  ) {
    return this.usersService.updateMe(user, userChanges, true);
  }

  @Patch(':id')
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') userId: string, @Body(new UpdateUserValidationPipe()) userChanges: UpdateUserDTO) {
    return this.usersService.update(userId, userChanges);
  }

  @Get(':id/turn-into-admin')
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  turnIntoAdmin(@Param('id') userId: string) {
    return this.usersService.update(userId, { role: UserRole.admin });
  }

  @Get()
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  retrieve(@Query(new QueryParamsNormalizationPipe()) userQuery: QueryParamsDTO) {
    return this.usersService.retrieve(userQuery, true);
  }

  @Get('me')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  getMe(@Request() { user }: { user: UserDocumentDTO }) {
    return this.usersService.getMe(user, true);
  }

  @Get(':id')
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  get(@Param('id') userId: string) {
    return this.usersService.getById(userId);
  }

  @Delete('me')
  @Role(UserRole.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  disableMe(@Request() { user }: { user: UserDocumentDTO }) {
    return this.usersService.disableMe(user);
  }

  @Delete(':id')
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  disable(@Param('id') userId: string) {
    return this.usersService.disable(userId);
  }

  @Delete(':id/delete')
  @Role(UserRole.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') userId: string) {
    return this.usersService.delete(userId);
  }
}
