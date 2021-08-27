import { UserRole } from 'src/shared/entities';
import { ROLE_KEY } from 'src/shared/decorators';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserViewDTO } from 'src/shared/DTO';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user }: { user: UserViewDTO } = context.switchToHttp().getRequest();
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log({ requiredRole, user });

    if (!requiredRole || user.role === UserRole.admin) return true;
    return user.role === requiredRole;
  }
}
