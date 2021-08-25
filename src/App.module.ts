import { ResponseInterceptor } from './interceptors';

import { RolesGuard } from './guards/Roles.guard';

import { AuthModule } from './API/auth';
import { UserModule } from './API/user';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest', { useCreateIndex: true, useFindAndModify: false }),
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
