import { AuthController } from './Auth.controller';
import { AuthService, AUTH_SERVICE, UserService, USER_SERVICE } from 'src/services';

import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [
    { provide: USER_SERVICE, useClass: UserService },
    { provide: AUTH_SERVICE, useClass: AuthService },
  ],
})
export class AuthModule {}
