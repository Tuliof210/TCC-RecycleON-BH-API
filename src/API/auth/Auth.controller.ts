import { AuthPayloadDTO } from 'src/shared/DTO';
import { BasicAuthGuard } from 'src/guards';
import { IAuthServiceToken, IAuthController, IAuthService } from '.';

import { Controller, Get, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject(IAuthServiceToken) private readonly authService: IAuthService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  login(@Request() { user }: { user: AuthPayloadDTO }) {
    return this.authService.login(user);
  }

  @Get('test')
  test() {
    return {
      message: 'Hello i am yout free test',
    };
  }
}
