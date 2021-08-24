import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { UserModule } from '../user';

import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [{ provide: 'AuthService', useClass: AuthService }],
})
export class AuthModule {}
