import { Module } from '@nestjs/common';

import { CreateUserModule } from './create/CreateUser.module';
import { GetUserModule } from './get/GetUser.module';

@Module({
  imports: [CreateUserModule, GetUserModule],
  exports: [CreateUserModule],
})
export class UserModule {}
