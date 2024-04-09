import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initFirebase } from './fireasbe';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  initFirebase();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '2mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
  await app.listen(3000);
}
bootstrap();
