import { AuthPayloadDTO } from 'src/shared/DTO';
import { BasicAuthGuard } from 'src/guards';
import { IAuthController, IAuthService } from '.';

import { Controller, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  login(@Request() { user }: { user: AuthPayloadDTO }) {
    return this.authService.login(user);
  }
}
