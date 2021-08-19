import { USER_REPOSITORY } from '..';
import { UserMongoDBRepository } from './UsersMongoDB.repository';
import { UserCollection, UserSchema } from './UserMongoDB.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
  exports: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
