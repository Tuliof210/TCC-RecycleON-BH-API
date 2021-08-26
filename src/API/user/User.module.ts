import { UserServiceToken } from '.';
import { UserService } from './User.service';
import { UserController } from './User.controller';

import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [UserController],
  providers: [{ provide: UserServiceToken, useClass: UserService }],
  exports: [{ provide: UserServiceToken, useClass: UserService }],
})
export class UserModule {}
