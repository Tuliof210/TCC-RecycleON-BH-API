import { IUsersServiceToken } from '.';
import { UsersService } from './Users.service';
import { UsersController } from './Users.controller';

import { UsersMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';

import { AuthModule } from '../auth';

@Module({
  imports: [UsersMongoDBRepositoryModule, AuthModule],
  controllers: [UsersController],
  providers: [{ provide: IUsersServiceToken, useClass: UsersService }],
  exports: [{ provide: IUsersServiceToken, useClass: UsersService }],
})
export class UsersModule {}
