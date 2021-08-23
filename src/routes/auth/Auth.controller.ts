import { CreateUserDTO, LoginDTO } from 'src/DTO';
import { CreateUserValidationPipe, LoginValidationPipe } from 'src/pipes';
import { IAuthController } from '.';
import { IAuthService } from 'src/services';

import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {}

  @Post()
  @HttpCode(200)
  login(@Body(new LoginValidationPipe()) loginData: LoginDTO) {
    return this.authService.login(loginData);
  }

  @Post('signup')
  signup(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
    return this.authService.signup(userData);
  }
}
