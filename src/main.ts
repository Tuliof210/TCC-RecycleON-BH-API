import { AppModule } from './App.module';

import { NestFactory } from '@nestjs/core';

import * as compression from 'compression';
import * as csurf from 'csurf';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(compression());
  app.use(csurf());
  app.use(helmet());

  await app.listen(3070);
}
bootstrap();
