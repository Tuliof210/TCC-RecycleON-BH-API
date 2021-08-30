import { jwtConstants } from 'src/constants';

import { AuthPayloadDTO } from 'src/shared/DTO';

import { IUserRepository, IUserRepositoryToken } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: AuthPayloadDTO) {
    return this.userRepository.findOne({ _id: payload._id });
  }
}
