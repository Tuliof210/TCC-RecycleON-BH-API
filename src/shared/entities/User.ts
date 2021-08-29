import { Entity } from '.';
import { CreateUserDTO } from 'src/shared/DTO';

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export const EmailRegex = /^\S{2,}@\S{2,}\.\S{2,}$/;
export const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; //Minimum 6 characters, at least one letter and one number

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public active: boolean;

  constructor(props: CreateUserDTO) {
    super();
    Object.assign(this, props);

    this.role = UserRole.user;
    this.active = true;
  }
}
