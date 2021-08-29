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
    this.active = true;

    if (props.role === UserRole.admin) this.role = UserRole.admin;
    else this.role = UserRole.user;
    delete props.role;

    Object.assign(this, props);
    console.log({ props, this: this });
  }
}
