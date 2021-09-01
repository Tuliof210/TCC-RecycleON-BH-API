import { AuthPayloadDTO } from 'src/shared/DTO';
import { BasicAuthGuard } from 'src/guards';
import { IAuthServiceToken, IAuthController, IAuthService } from '.';

import { Controller, Get, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as utm from 'utm';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    @Inject(IAuthServiceToken) private readonly authService: IAuthService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  login(@Request() { user }: { user: AuthPayloadDTO }) {
    return this.authService.login(user);
  }

  @Get('test')
  test() {
    const cityZone = this.config.get<{ number: number; letter: string }>('cityZone');

    return {
      latLong: utm.toLatLon(613555.0473, 7804298.2887, cityZone.number, cityZone.letter),
      message: 'Hello i am yout free test',
    };
  }
}
