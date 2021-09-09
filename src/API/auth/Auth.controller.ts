import { AuthPayloadDTO } from 'src/shared/DTO';
import { BasicAuthGuard } from 'src/guards';
import { IAuthServiceToken, IAuthController, IAuthService } from '.';

import { Controller, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiBasicAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject(IAuthServiceToken) private readonly authService: IAuthService) {}

  @ApiBasicAuth()
  @ApiOkResponse({ description: 'The user has been succesfully authenticated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  login(@Request() { user }: { user: AuthPayloadDTO }) {
    return this.authService.login(user);
  }
}
