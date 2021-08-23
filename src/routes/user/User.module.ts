import { UserController } from './User.controller';
import { UserService } from 'src/services';

import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [UserController],
  providers: [{ provide: 'UserService', useClass: UserService }],
  exports: [UserMongoDBRepositoryModule, { provide: 'UserService', useClass: UserService }],
})
export class UserModule {}
