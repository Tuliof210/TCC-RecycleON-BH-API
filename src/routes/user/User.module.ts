import { UserController } from './User.controller';
import { UserService, USER_SERVICE } from 'src/services';

import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [UserController],
  providers: [{ provide: USER_SERVICE, useClass: UserService }],
})
export class UserModule {}
