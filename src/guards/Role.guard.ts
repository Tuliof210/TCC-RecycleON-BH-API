import { UserRole } from 'src/shared/entities';
import { ROLE_KEY } from 'src/shared/decorators';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDocumentDTO } from 'src/shared/DTO';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user }: { user: UserDocumentDTO } = context.switchToHttp().getRequest();
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole || user.role === UserRole.admin) return true;
    return user.role === requiredRole;
  }
}
