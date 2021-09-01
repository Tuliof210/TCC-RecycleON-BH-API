import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/shared/entities';

export const ROLE_KEY = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
