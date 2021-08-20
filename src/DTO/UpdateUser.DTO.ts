import { User } from 'src/entities';

export type UpdateUserDTO = Pick<User, 'name'>;
