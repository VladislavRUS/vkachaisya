import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { AuthGuard } from './modules/auth/auth.guard';
import express from 'express';
import { getRepository } from 'typeorm'
import { User } from './database/entities/User';
import { Subscription } from './database/entities/Subscription';
import { Challenge } from './database/entities/Challenge';
import { Mock } from './mocks';

async function initMock() {
  const { users, challenges, subscriptions } = Mock.getMock();

  const usersRepository = await getRepository(User);
  const challengeRepository = await getRepository(Challenge);
  const subscriptionRepository = await getRepository(Subscription);

  for (let i = 0; i < users.length; i++) {
    await usersRepository.insert(users[i])
  }

  for (let i = 0; i < challenges.length; i++) {
    await challengeRepository.insert(challenges[i])
  }

  for (let i = 0; i < subscriptions.length; i++) {
    await subscriptionRepository.insert(subscriptions[i])
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new AuthGuard());
  app.setGlobalPrefix('/api');

  app.use('/static', express.static(process.cwd() + '/upload'));

  if (process.env.APP_ENV === 'development') {
    await initMock();
  }

  await app.listen(3000);
}

bootstrap();
