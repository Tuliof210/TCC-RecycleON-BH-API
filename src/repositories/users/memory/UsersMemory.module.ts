import { Module } from '@nestjs/common';

import { USER_REPOSITORY } from '..';
import { UserMemoryRepository } from './UsersMemory.repository';

@Module({
  providers: [{ provide: USER_REPOSITORY, useClass: UserMemoryRepository }],
  exports: [{ provide: USER_REPOSITORY, useClass: UserMemoryRepository }],
})
export class UserMemoryRepositoryModule {}
