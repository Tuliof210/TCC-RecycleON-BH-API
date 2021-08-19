import { Entity } from '.';

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;
  public active: boolean;

  constructor(props: Omit<User, '_id' | 'active'>, _id?: string) {
    super(_id);
    this.active = true;

    Object.assign(this, props);
  }
}
