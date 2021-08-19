import { CreateUserController, CreateUserService, CREATE_USER_SERVICE } from './create';

import { GetUserController } from './get/GetUser.controller';
import { GetUserService } from './get/GetUser.service';

import { ResponseHelper, RESPONSE_HELPER } from 'src/helpers';

import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { RetrieveUsersController } from './retrieve/RetrieveUsers.controller';
import { RetrieveUsersService } from './retrieve/RetrieveUsers.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [CreateUserController, GetUserController, RetrieveUsersController],
  providers: [
    ResponseHelper,
    { provide: RESPONSE_HELPER, useClass: ResponseHelper },
    { provide: CREATE_USER_SERVICE, useClass: CreateUserService },
    GetUserService,
    RetrieveUsersService,
  ],
  exports: [{ provide: CREATE_USER_SERVICE, useClass: CreateUserService }, GetUserService, RetrieveUsersService],
})
export class UserModule {}
