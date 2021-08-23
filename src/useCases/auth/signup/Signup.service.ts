import { CreateUserDTO } from 'src/DTO';
import { ISignupService } from '.';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SignupService implements ISignupService {
  execute(userData: CreateUserDTO) {
    return Promise.resolve({ token: '123', user: { name: 'name', email: 'email', password: 'password' } });
  }
}
