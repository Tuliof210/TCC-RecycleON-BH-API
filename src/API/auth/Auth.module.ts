import { jwtContants } from 'src/constants';
import { LocalStrategy, JwtStrategy } from 'src/guards';

import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { UserModule } from '../user';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: jwtContants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [{ provide: 'AuthService', useClass: AuthService }, LocalStrategy, JwtStrategy],
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
