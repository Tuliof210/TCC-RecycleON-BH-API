import { CreateUserDTO } from 'src/DTO';
import { ISignupController, ISignupService, SIGNUP_USER_SERVICE } from '.';

import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class SignupController implements ISignupController {
  constructor(@Inject(SIGNUP_USER_SERVICE) private readonly signupService: ISignupService) {}

  @Post('signup')
  handle(@Body() userData: CreateUserDTO) {
    return this.signupService.execute(userData);
  }
}
