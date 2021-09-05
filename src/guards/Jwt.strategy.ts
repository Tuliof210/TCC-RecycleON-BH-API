import { AuthPayloadDTO } from 'src/shared/DTO';
import { IUsersRepository, IUsersRepositoryToken } from 'src/repositories/users';

import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IUsersRepositoryToken) private readonly userRepository: IUsersRepository,
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
