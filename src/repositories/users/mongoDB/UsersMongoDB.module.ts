import { UserMongoDBRepository, UserSchema } from '.';
import { UserCollection } from './UserMongoDB.schema';
import { UserRepositoryToken } from '..';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [{ provide: UserRepositoryToken, useClass: UserMongoDBRepository }],
  exports: [{ provide: UserRepositoryToken, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
