import { UserCollection, UserMongoDBRepository, UserSchema } from '.';
import { USER_REPOSITORY } from '..';
import { HttpErrorStatusHelper, HTTP_ERROR_STATUS_HELPER } from 'src/helpers';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserCollection, schema: UserSchema }])],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserMongoDBRepository },
    { provide: HTTP_ERROR_STATUS_HELPER, useClass: HttpErrorStatusHelper },
  ],
  exports: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
