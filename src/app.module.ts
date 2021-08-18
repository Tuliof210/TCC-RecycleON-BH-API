import { Module } from '@nestjs/common';

import { UserModule } from './useCases/user/User.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
