import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MasterKeyAuthGuard implements CanActivate {
  private masterkey: string;

  constructor(private readonly config: ConfigService) {
    this.masterkey = this.config.get<string>('secretkeys')['master'];
  }
  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();

    if (headers.masterkey === this.masterkey) return true;
    throw new UnauthorizedException();
  }
}
