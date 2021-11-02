import { UsersMongoDBRepository, UserSchema } from '.';
import { UserCollection } from './UserMongoDB.schema';
import { IUsersRepositoryToken } from '..';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [{ provide: IUsersRepositoryToken, useClass: UsersMongoDBRepository }],
  exports: [{ provide: IUsersRepositoryToken, useClass: UsersMongoDBRepository }],
})
export class UsersMongoDBRepositoryModule {}
