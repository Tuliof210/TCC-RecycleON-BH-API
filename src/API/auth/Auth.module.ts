import { IAuthServiceToken } from '.';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';

import { BasicStrategy, JwtStrategy } from 'src/guards';
import { UsersMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersMongoDBRepositoryModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('secretkeys')['jwt'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [{ provide: IAuthServiceToken, useClass: AuthService }, BasicStrategy, JwtStrategy],
  exports: [{ provide: IAuthServiceToken, useClass: AuthService }],
})
export class AuthModule {}
