import { CreateUserController } from './create/CreateUser.controller';
import { CreateUserService } from './create/CreateUser.service';
import { CREATE_USER_SERVICE } from './create';

import { GetUserController } from './get/GetUser.controller';
import { GetUserService } from './get/GetUser.service';

import { RESPONSE_HELPER } from 'src/helpers';
import { ResponseHelper } from 'src/helpers/Response.helper';

import { UserMongoDBRepositoryModule } from 'src/repositories/users';

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
