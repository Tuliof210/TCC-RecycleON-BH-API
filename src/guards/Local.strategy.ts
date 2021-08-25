import { AuthPayloadDTO } from 'src/shared/DTO';
import { IAuthService } from 'src/API/auth';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<AuthPayloadDTO> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    return { _id: user._id, email: user.email, role: user.role };
  }
}
