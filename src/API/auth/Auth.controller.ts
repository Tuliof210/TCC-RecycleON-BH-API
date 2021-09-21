import { UserDTO } from 'src/shared/DTO';
import { BasicAuthGuard } from 'src/guards';
import { IAuthServiceToken, IAuthController, IAuthService } from '.';

import { Controller, Get, HttpCode, Inject, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiBasicAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject(IAuthServiceToken) private readonly authService: IAuthService) {}

  @ApiBasicAuth()
  @ApiOkResponse({ description: 'The user has been succesfully authenticated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  signIn(@Request() { user }: { user: UserDTO }) {
    return this.authService.signIn(user);
  }
}
