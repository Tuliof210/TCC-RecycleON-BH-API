import { User } from 'src/entities';

export type CreateUserDTO = Omit<User, '_id' | 'active'>;
