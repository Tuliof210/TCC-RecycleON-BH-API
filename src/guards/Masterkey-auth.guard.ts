import { masterkey } from 'src/constants';

import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class MasterKeyAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();

    if (headers.masterkey === masterkey) return true;
    throw new UnauthorizedException();
  }
}
