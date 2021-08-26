import { Entity } from '.';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export const EmailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
export const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; //Minimum 6 characters, at least one letter and one number

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public active: boolean;

  constructor(props: Omit<User, '_id' | 'active' | 'role'>, isAdmin = false) {
    super();
    this.active = true;
    this.role = isAdmin ? UserRole.Admin : UserRole.User;

    Object.assign(this, props);
  }
}
