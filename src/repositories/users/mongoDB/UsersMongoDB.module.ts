import { Module } from '@nestjs/common';

import { USER_REPOSITORY } from '..';
import { UserMongoDBRepository } from './UsersMongoDB.repository';

@Module({
  providers: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
  exports: [{ provide: USER_REPOSITORY, useClass: UserMongoDBRepository }],
})
export class UserMongoDBRepositoryModule {}
