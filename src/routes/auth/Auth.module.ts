import { AuthController } from './Auth.controller';
import { AuthService } from 'src/services/common';

import { Module } from '@nestjs/common';

import { UserModule } from '../user';
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [{ provide: 'AuthService', useClass: AuthService }],
})
export class AuthModule {}
