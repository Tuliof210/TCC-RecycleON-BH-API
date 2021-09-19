import { UserDTO } from 'src/shared/DTO';
import { IAuthServiceToken, IAuthService } from 'src/API/auth';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'http') {
  constructor(@Inject(IAuthServiceToken) private readonly authService: IAuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<UserDTO> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
