import { CreateUserDTO } from 'src/DTO';
import { CreateUserValidationPipe } from 'src/pipes';
import { IAuthController } from '.';
import { IAuthService } from 'src/services';

import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {}

  @Post()
  login(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    return this.authService.login(userData);
  }

  @Post()
  signup(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    return this.authService.signup(userData);
  }
}
