import { Entity } from '.';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public active: boolean;

  constructor(props: Omit<User, '_id' | 'active' | 'role'>, isAdmin = false) {
    super();
    this.active = true;
    this.role = isAdmin ? Role.Admin : Role.User;

    Object.assign(this, props);
  }
}
