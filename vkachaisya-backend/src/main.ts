import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { AuthGuard } from './modules/auth/auth.guard';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new AuthGuard());
  app.setGlobalPrefix('/api');

  app.use('/static', express.static(process.cwd() + '/upload'));

  await app.listen(3000);
}

bootstrap();
