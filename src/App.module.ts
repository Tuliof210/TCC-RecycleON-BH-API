import { ResponseInterceptor } from './interceptors';

import { UserModule } from './useCases/user';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest', { useCreateIndex: true, useFindAndModify: false }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
