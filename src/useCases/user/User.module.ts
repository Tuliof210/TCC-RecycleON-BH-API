import { Module } from '@nestjs/common';

import { ResponseHelper } from 'src/helpers/Response.helper';

//import { UserMemoryRepositoryModule } from 'src/repositories/users/memory/UsersMemory.module';
import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB/UsersMongoDB.module';

import { CREATE_USER_SERVICE, CreateUserService, CreateUserController } from './create';

import { GetUserController } from './get/GetUser.controller';
import { RetrieveUsersController } from './retrieve/RetrieveUsers.controller';

import { GetUserService } from './get/GetUser.service';
import { RetrieveUsersService } from './retrieve/RetrieveUsers.service';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [CreateUserController, GetUserController, RetrieveUsersController],
  providers: [
    ResponseHelper,
    { provide: CREATE_USER_SERVICE, useClass: CreateUserService },
    GetUserService,
    RetrieveUsersService,
  ],
  exports: [CreateUserService, GetUserService, RetrieveUsersService],
})
export class UserModule {}
