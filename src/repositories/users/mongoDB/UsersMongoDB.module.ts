import { UserCollection, UserMongoDBRepository, UserSchema } from '.';
import { USER_REPOSITORY } from '..';
import { RepositoryHttpStatusHelper, REPOSITORY_HTTP_STATUS_HELPER } from 'src/helpers';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserMongoDBRepository },
    { provide: REPOSITORY_HTTP_STATUS_HELPER, useClass: RepositoryHttpStatusHelper },
  ],
  exports: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
