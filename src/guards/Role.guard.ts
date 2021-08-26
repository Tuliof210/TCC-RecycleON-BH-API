import { UserRole } from 'src/shared/entities';
import { ROLE_KEY } from 'src/shared/decorators';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log({ requiredRole, user });

    if (!requiredRole) {
      return true;
    }

    return user;
  }
}
