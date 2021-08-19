import { Module } from '@nestjs/common';

import { ResponseHelper } from 'src/helpers/Response.helper';

//import { UserMemoryRepositoryModule } from 'src/repositories/users/memory/UsersMemory.module';
import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB/UsersMongoDB.module';

import { CREATE_USER_SERVICE } from './create/index';
import { CreateUserService } from './create/CreateUser.service';
import { CreateUserController } from './create/CreateUser.controller';

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
  exports: [{ provide: CREATE_USER_SERVICE, useClass: CreateUserService }, GetUserService, RetrieveUsersService],
})
export class UserModule {}
