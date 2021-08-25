import { UserViewDTO } from 'src/DTO';
import { LocalAuthGuard } from 'src/guards';
import { IAuthController, IAuthService } from '.';

import { Controller, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(200)
  login(@Request() { user }: { user: UserViewDTO }) {
    console.log({ user });
    return this.authService.login(user);
  }

  // @Post('signup')
  // signup(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
  //   return this.authService.signup(userData);
  // }
}
