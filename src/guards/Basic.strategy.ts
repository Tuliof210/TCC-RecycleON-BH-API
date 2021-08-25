import { AuthPayloadDTO } from 'src/shared/DTO';
import { IAuthService } from 'src/API/auth';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'http') {
  constructor(@Inject('AuthService') private readonly authService: IAuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<AuthPayloadDTO> {
    console.log({ email, password });
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    return { _id: user._id, email: user.email, role: user.role };
  }
}
