import { jwtContants } from 'src/constants';

import { AuthPayloadDTO } from 'src/shared/DTO';

import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtContants.secret,
    });
  }

  async validate(payload: AuthPayloadDTO): Promise<AuthPayloadDTO> {
    return payload;
  }
}
