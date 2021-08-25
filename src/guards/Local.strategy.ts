import { UserViewDTO } from 'src/shared/DTO';
import { IAuthService } from 'src/API/auth';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<UserViewDTO> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
