import { AppModule } from './App.module';

import { NestFactory } from '@nestjs/core';

import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());

  await app.listen(3070);
}
bootstrap();
