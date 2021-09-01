import { UserMongoDBRepository, UserSchema } from '.';
import { UserCollection } from './UserMongoDB.schema';
import { IUserRepositoryToken } from '..';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [{ provide: IUserRepositoryToken, useClass: UserMongoDBRepository }],
  exports: [{ provide: IUserRepositoryToken, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
