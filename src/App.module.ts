import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors';

import { UserModule } from './useCases/user/User.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest', { useCreateIndex: true }), UserModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor }],
})
export class AppModule {}
