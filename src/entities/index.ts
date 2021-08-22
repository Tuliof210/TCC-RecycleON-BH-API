import { v4 as uuidV4, validate as validateV4 } from 'uuid';

class Entity {
  public readonly _id: string;

  constructor(_id?: string) {
    const isValid = validateV4(_id);
    this._id = _id && isValid ? _id : uuidV4();
  }
}

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
