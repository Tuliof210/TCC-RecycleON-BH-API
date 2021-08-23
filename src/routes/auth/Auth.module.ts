import { AuthController } from './Auth.controller';
import { AuthService, UserService } from 'src/services';

import { Module } from '@nestjs/common';

import { UserMongoDBRepositoryModule } from 'src/repositories/users/mongoDB';
import { UserModule } from '../user';
@Module({
  // imports: [UserModule],
  // controllers: [AuthController],
  // providers: [{ provide: 'AuthService', useClass: AuthService }],
})
export class AuthModule {}
