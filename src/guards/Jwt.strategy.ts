import { AuthPayloadDTO } from 'src/shared/DTO';

import { IUserRepository, IUserRepositoryToken } from 'src/repositories/users';

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('secretkeys')['jwt'],
    });
  }

  validate(payload: AuthPayloadDTO) {
    return this.userRepository.findOne({ _id: payload._id });
  }
}
