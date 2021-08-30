import { SharedModule } from './shared';
import { ResponseInterceptor } from './interceptors';

import { AuthModule } from './API/auth';
import { UserModule } from './API/user';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/recycleon-bh', { useCreateIndex: true, useFindAndModify: false }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
