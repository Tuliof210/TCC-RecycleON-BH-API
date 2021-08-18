import { Entity } from './Entity';

export class User extends Entity {
  public name: string;
  public email: string;
  public password: string;

  constructor(props: Omit<User, 'id'>, id?: string) {
    super(id);
    Object.assign(this, props);

    console.log('inside user: ', props);
  }
}
