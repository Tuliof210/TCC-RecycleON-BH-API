import { GlobalModule } from './shared';
import { ResponseInterceptor } from './interceptors';

import { AuthModule } from './API/auth';
import { UserModule } from './API/user';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest', { useCreateIndex: true, useFindAndModify: false }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
