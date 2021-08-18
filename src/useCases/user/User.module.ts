import { Module } from '@nestjs/common';

import { CreateUserController } from './create/CreateUser.controller';
import { CreateUserService } from './create/CreateUser.service';

import { ResponseHelper } from 'src/helpers/Response.helper';

//import { UserMemoryRepositoryModule } from 'src/repositories/users/memory/UsersMemory.module';
import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB/UsersMongoDB.module';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [CreateUserController],
  providers: [CreateUserService, ResponseHelper],
  exports: [CreateUserService],
})
export class UserModule {}
