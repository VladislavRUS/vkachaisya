import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../../database/entities/Subscription';
import { User } from '../../database/entities/User';
import { Challenge } from '../../database/entities/Challenge';
import { CreateSubscriptionDto } from './dto/CreateSubscriptionDto';

@Injectable()
export class SubscriptionsService {
  constructor(@InjectRepository(Subscription) private subscriptionRepository: Repository<Subscription>) {}

  async create(userId: number, createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = new Subscription();

    const user = new User();
    user.id = userId;
    subscription.user = user;

    const challenge = new Challenge();
    challenge.id = createSubscriptionDto.challengeId;
    subscription.challenge = challenge;

    subscription.startDate = new Date().toISOString();

    const { identifiers } = await this.subscriptionRepository.insert(subscription);

    return this.getById(identifiers[0].id);
  }

  async getByChallengeId(challengeId: number) {
    const challenge = new Challenge();
    challenge.id = challengeId;

    return this.subscriptionRepository.find({ challenge });
  }

  async getById(subscriptionId: number, relations: string[] = []) {
    return this.subscriptionRepository.findOne({ id: subscriptionId }, { relations });
  }

  async getByUserId(userId: number) {
    const user = new User();
    user.id = userId;

    return this.subscriptionRepository.find({ user });
  }

  async getByUserIdAndChallengeId(userId: number, challengeId: number) {
    return this.subscriptionRepository.findOne({ where: { user: { id: userId }, challenge: { id: challengeId } } });
  }
}
