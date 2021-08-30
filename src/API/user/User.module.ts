import { IUserServiceToken } from '.';
import { UserService } from './User.service';
import { UserController } from './User.controller';

import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';

import { AuthModule } from '../auth';

@Module({
  imports: [UserMongoDBRepositoryModule, AuthModule],
  controllers: [UserController],
  providers: [{ provide: IUserServiceToken, useClass: UserService }],
  exports: [{ provide: IUserServiceToken, useClass: UserService }],
})
export class UserModule {}
