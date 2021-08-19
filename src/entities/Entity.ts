import { v4 as uuidV4, validate as validateV4 } from 'uuid';

export class Entity {
  public readonly _id: string;

  constructor(_id?: string) {
    const isValid = validateV4(_id);
    this._id = _id && isValid ? _id : uuidV4();
  }
}
