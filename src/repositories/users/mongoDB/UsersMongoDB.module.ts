import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserCollection, UserSchema } from './User.schema';

import { USER_REPOSITORY } from '..';
import { UserMongoDBRepository } from './UsersMongoDB.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
  exports: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
