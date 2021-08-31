import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class MasterKeyAuthGuard implements CanActivate {
  private masterkey = process.env.MASTER_KEY;
  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();

    if (headers.masterkey === this.masterkey) return true;
    throw new UnauthorizedException();
  }
}
