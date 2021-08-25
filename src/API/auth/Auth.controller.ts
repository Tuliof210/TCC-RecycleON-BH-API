import { AuthPayloadDTO } from 'src/shared/DTO';
import { LocalAuthGuard } from 'src/guards';
import { IAuthController, IAuthService } from '.';

import { Controller, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(200)
  login(@Request() { user }: { user: AuthPayloadDTO }) {
    console.log({ AuthPayload: user });
    return this.authService.login(user);
  }
}
