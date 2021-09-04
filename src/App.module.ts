import { ResponseInterceptor } from './interceptors';

import { CronModule } from './services/cron';
import { SharedModule } from './shared';
import { AuthModule } from './API/auth';
import { UserModule } from './API/user';
import { LocationModule } from './API/location';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CronModule,
    SharedModule,
    AuthModule,
    UserModule,
    LocationModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './env/.env', load: [configuration] }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database'),
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
