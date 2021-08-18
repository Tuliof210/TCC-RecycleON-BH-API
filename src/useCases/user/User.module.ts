import { Module } from '@nestjs/common';

import { CreateUserController } from './create/CreateUser.controller';
import { GetUserController } from './get/GetUser.controller';

import { CreateUserService } from './create/CreateUser.service';
import { GetUserService } from './get/GetUser.service';

import { USER_REPOSITORY } from 'src/repositories/users';
import { LocalUsersRepository } from 'src/repositories/users/LocalUsersRepository';

@Module({
  controllers: [CreateUserController, GetUserController],
  providers: [CreateUserService, GetUserService, { provide: USER_REPOSITORY, useClass: LocalUsersRepository }],
})
export class UserModule {}
