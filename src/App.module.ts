import { ResponseInterceptor } from './interceptors';

import { CronModule } from './services/cron';
import { SharedModule } from './shared';
import { AuthModule } from './API/auth';
import { UsersModule } from './API/users';
import { LocationsModule } from './API/locations';
import { WikiModule } from './API/wiki';

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
    UsersModule,
    LocationsModule,
    WikiModule,
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
