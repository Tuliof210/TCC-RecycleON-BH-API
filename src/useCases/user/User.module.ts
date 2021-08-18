import { Module } from '@nestjs/common';

import { CreateUserModule } from './create/CreateUser.module';

@Module({
  imports: [CreateUserModule],
  exports: [CreateUserModule],
})
export class UserModule {}
