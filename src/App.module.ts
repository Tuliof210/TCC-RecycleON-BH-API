import { Module } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/Logger.interceptor';

import { UserModule } from './useCases/user/User.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
