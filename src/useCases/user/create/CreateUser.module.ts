import { Module } from '@nestjs/common';

import { CreateUserController } from './CreateUser.controller';

import { CreateUserService } from './CreateUser.service';

import { USER_REPOSITORY } from 'src/repositories/users/IUsersRepository';
import { LocalUsersRepository } from 'src/repositories/users/implementations/LocalUsersRepository';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService, { provide: USER_REPOSITORY, useClass: LocalUsersRepository }],
})
export class CreateUserModule {}
