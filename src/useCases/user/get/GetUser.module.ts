import { Module } from '@nestjs/common';

import { GetUserController } from './GetUser.controller';
import { GetUserService } from './GetUser.service';

import { USER_REPOSITORY } from 'src/repositories/users';
import { LocalUsersRepository } from 'src/repositories/users/LocalUsersRepository';

@Module({
  controllers: [GetUserController],
  providers: [GetUserService, { provide: USER_REPOSITORY, useClass: LocalUsersRepository }],
})
export class GetUserModule {}
