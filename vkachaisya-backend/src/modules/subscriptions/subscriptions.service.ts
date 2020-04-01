import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../../database/entities/Subscription';
import { User } from '../../database/entities/User';
import { Challenge } from '../../database/entities/Challenge';
import { CreateSubscriptionDto } from './dto/CreateSubscriptionDto';
import { UserSubscriptionDto } from './dto/UserSubscriptionDto';
import { SubscriptionResultDto } from './dto/SubscriptionResultDto';

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

    return this.getSubscriptionResult(identifiers[0].id);
  }

  async getByChallengeId(challengeId: number, relations: string[] = []) {
    return this.subscriptionRepository.find({ where: { challenge: { id: challengeId } }, relations });
  }

  async getById(subscriptionId: number, relations: string[] = []) {
    return this.subscriptionRepository.findOne({ id: subscriptionId }, { relations });
  }

  async getByUserId(userId: number) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { user: { id: userId } },
      relations: ['challenge'],
    });

    const result: UserSubscriptionDto[] = [];

    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];

      const userSubscriptionDto = new UserSubscriptionDto();
      userSubscriptionDto.id = subscription.id;
      userSubscriptionDto.title = subscription.challenge.title;
      userSubscriptionDto.days = subscription.challenge.days;
      userSubscriptionDto.hashtag = subscription.challenge.hashtag;
      userSubscriptionDto.startDate = subscription.startDate;
      userSubscriptionDto.challengeId = subscription.challenge.id;
      userSubscriptionDto.totalParticipants = await this.countUsersByChallengeId(subscription.challenge.id);
      const subscriptionsSlice = await this.getSubscriptionsWithMaxUsers(subscription.challenge.id, 3);
      userSubscriptionDto.avatars = subscriptionsSlice.map(subscription => subscription.user.avatar);

      result.push(userSubscriptionDto);
    }

    return result;
  }

  async getByUserIdAndChallengeId(userId: number, challengeId: number) {
    return this.subscriptionRepository.findOne({ where: { user: { id: userId }, challenge: { id: challengeId } } });
  }

  async getSubscriptionResult(subscriptionId: number) {
    const subscription = await this.getById(subscriptionId, ['challenge']);

    const subscriptionResultDto = new SubscriptionResultDto();
    subscriptionResultDto.id = subscription.id;
    subscriptionResultDto.title = subscription.challenge.title;
    subscriptionResultDto.days = subscription.challenge.days;
    subscriptionResultDto.hashtag = subscription.challenge.hashtag;
    subscriptionResultDto.startDate = subscription.startDate;
    const subscriptions = await this.getByChallengeId(subscription.challenge.id, ['user']);
    subscriptionResultDto.users = subscriptions.map(subscription => subscription.user);

    return subscriptionResultDto;
  }

  async countUsersByChallengeId(challengeId: number) {
    return this.subscriptionRepository.count({ where: { challenge: { id: challengeId } } });
  }

  async getSubscriptionsWithMaxUsers(challengeId: number, take: number) {
    return this.subscriptionRepository.find({ where: { challenge: { id: challengeId } }, take, relations: ['user'] });
  }
}
