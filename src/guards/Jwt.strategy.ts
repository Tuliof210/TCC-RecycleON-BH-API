import { jwtContants } from 'src/constants';

import { AuthPayloadDTO } from 'src/shared/DTO';
import { UserModel } from 'src/repositories/users/mongoDB';
import { UserCollection } from 'src/repositories/users/mongoDB/UserMongoDB.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(UserCollection) private userModel: UserModel) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtContants.secret,
    });
  }

  async validate(payload: AuthPayloadDTO): Promise<AuthPayloadDTO> {
    console.log({ payload });
    //TODO solve this: what if the user in payload no longer exists?
    return payload;
  }
}
