import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3070);
}
bootstrap();
