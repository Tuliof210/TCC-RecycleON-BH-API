import { CreateUserController, CreateUserService, CREATE_USER_SERVICE } from './create';
import { DeleteUserController, DeleteUserService, DELETE_USER_SERVICE } from './delete';
import { DisableUserController, DisableUserService, DISABLE_USER_SERVICE } from './disable';
import { GetUserController, GetUserService, GET_USER_SERVICE } from './get';
import { RetrieveUsersController, RetrieveUsersService, RETRIEVE_USERS_SERVICE } from './retrieve';
import { UpdateUserController, UpdateUserService, UPDATE_USER_SERVICE } from './update';

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
    { provide: RESPONSE_HELPER, useClass: ResponseHelper },
    { provide: CREATE_USER_SERVICE, useClass: CreateUserService },
    { provide: DELETE_USER_SERVICE, useClass: DeleteUserService },
    { provide: DISABLE_USER_SERVICE, useClass: DisableUserService },
    { provide: GET_USER_SERVICE, useClass: GetUserService },
    { provide: RETRIEVE_USERS_SERVICE, useClass: RetrieveUsersService },
    { provide: UPDATE_USER_SERVICE, useClass: UpdateUserService },
  ],
})
export class UserModule {}
