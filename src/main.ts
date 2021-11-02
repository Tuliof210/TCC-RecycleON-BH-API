import { AppModule } from './App.module';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(compression());

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('API RecycleON BH')
    .setDescription('Descrição da API RecycleON BH')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //-------------------------------------------------------

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
