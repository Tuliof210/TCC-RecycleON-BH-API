import { jwtConstants } from 'src/constants';

import { AuthPayloadDTO, UserViewDTO } from 'src/shared/DTO';
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
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: AuthPayloadDTO): Promise<UserViewDTO> {
    return this.userModel.findOne({ _id: payload._id }).exec();
  }
}
