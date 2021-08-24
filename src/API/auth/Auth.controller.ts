import { UserViewDTO } from 'src/DTO';
import { LocalAuthGuard } from 'src/guards';
import { IAuthController } from '.';

import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(200)
  login(@Request() { user }: { user: UserViewDTO }) {
    console.log({ user });
    return { token: '123', user };
  }

  // @Post('signup')
  // signup(@Body(new CreateUserValidationPipe()) userData: CreateUserDTO) {
  //   return this.authService.signup(userData);
  // }
}
