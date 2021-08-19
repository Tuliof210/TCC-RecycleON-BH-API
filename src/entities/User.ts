import { Entity } from './Entity';

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, '_id'>, _id?: string) {
    super(_id);
    Object.assign(this, props);
  }
}
