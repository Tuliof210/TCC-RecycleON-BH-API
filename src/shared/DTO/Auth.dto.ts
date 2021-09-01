import { User } from 'src/shared/entities';

export type AuthPayloadDTO = Pick<User, '_id' | 'email' | 'role'>;
