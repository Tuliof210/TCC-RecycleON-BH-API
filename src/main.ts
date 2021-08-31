import { AppModule } from './App.module';

import { NestFactory } from '@nestjs/core';

import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  const port = Number(process.env.HOST_PORT) || 3070;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  await app.listen(port);
}
bootstrap();
