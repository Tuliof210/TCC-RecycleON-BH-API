import { Module } from '@nestjs/common';

import { ResponseHelper } from 'src/helpers/Response.helper';

//import { UserMemoryRepositoryModule } from 'src/repositories/users/memory/UsersMemory.module';
import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB/UsersMongoDB.module';

import { CreateUserController } from './create/CreateUser.controller';
import { GetUserController } from './get/GetUser.controller';
import { RetrieveUsersController } from './retrieve/RetrieveUsers.controller';

import { CreateUserService } from './create/CreateUser.service';
import { GetUserService } from './get/GetUser.service';
import { RetrieveUsersService } from './retrieve/RetrieveUsers.service';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [CreateUserController, GetUserController, RetrieveUsersController],
  providers: [ResponseHelper, CreateUserService, GetUserService, RetrieveUsersService],
  exports: [CreateUserService, GetUserService, RetrieveUsersService],
})
export class UserModule {}
