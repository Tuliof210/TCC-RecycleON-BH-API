import { UserCollection, UserMongoDBRepository, UserSchema } from '.';
import { USER_REPOSITORY } from '..';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
  exports: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
