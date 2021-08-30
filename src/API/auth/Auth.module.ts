import { IAuthServiceToken } from '.';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';

import { jwtConstants } from 'src/constants';
import { BasicStrategy, JwtStrategy } from 'src/guards';
import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserMongoDBRepositoryModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
  providers: [{ provide: IAuthServiceToken, useClass: AuthService }, BasicStrategy, JwtStrategy],
})
export class AuthModule {}

/**
 * token irá durar 24h => 86400s
 * para tester irá durar 5m => 300s
 * configurar isso via .env
 * ------------------------------------------
 * session = true
 * useful for the common scenario of users
 * accessing a web application via a browser.
 */
