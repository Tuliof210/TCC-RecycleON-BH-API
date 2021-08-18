import { Module } from '@nestjs/common';

import { CreateUserController } from './create/CreateUser.controller';
import { CreateUserService } from './create/CreateUser.service';

import { ResponseHelper } from 'src/helpers/response.helper';
import { USER_REPOSITORY } from 'src/repositories/users';
import { LocalUsersRepository } from 'src/repositories/users/LocalUsersRepository';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService, ResponseHelper, { provide: USER_REPOSITORY, useClass: LocalUsersRepository }],
})
export class UserModule {}
