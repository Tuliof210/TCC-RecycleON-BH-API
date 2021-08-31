import { AppModule } from './App.module';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  await app.listen(port);
}
bootstrap();
