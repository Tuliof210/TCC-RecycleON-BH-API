import { CreateUserController, CreateUserService, CREATE_USER_SERVICE } from './create';
import { DeleteUserController } from './delete';
import { DisableUserController } from './disable';
import { GetUserController, GetUserService, GET_USER_SERVICE } from './get';
import { RetrieveUsersController, RetrieveUsersService, RETRIEVE_USERS_SERVICE } from './retrieve';
import { UpdateUserController } from './update';

import { ResponseHelper, RESPONSE_HELPER } from 'src/helpers';
import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';

@Module({
  imports: [UserMongoDBRepositoryModule],
  controllers: [
    CreateUserController,
    DeleteUserController,
    DisableUserController,
    GetUserController,
    RetrieveUsersController,
    UpdateUserController,
  ],
  providers: [
    ResponseHelper,
    { provide: RESPONSE_HELPER, useClass: ResponseHelper },
    { provide: CREATE_USER_SERVICE, useClass: CreateUserService },
    { provide: GET_USER_SERVICE, useClass: GetUserService },
    { provide: RETRIEVE_USERS_SERVICE, useClass: RetrieveUsersService },
  ],
  exports: [
    { provide: CREATE_USER_SERVICE, useClass: CreateUserService },
    { provide: GET_USER_SERVICE, useClass: GetUserService },
    { provide: RETRIEVE_USERS_SERVICE, useClass: RetrieveUsersService },
  ],
})
export class UserModule {}
