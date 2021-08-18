import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/Log.interceptor';

import { AppLoggerMiddleware } from './middlewares/Logger.middleware';

import { UserModule } from './useCases/user/User.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
