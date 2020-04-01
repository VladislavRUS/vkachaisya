import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Challenge } from '../../database/entities/Challenge';
import { CreateChallengeDto } from './dto/CreateChallengeDto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { CreateSubscriptionDto } from '../subscriptions/dto/CreateSubscriptionDto';
import { ChallengeWithUserSubscriptionDto } from './dto/ChallengeWithUserSubscriptionDto';
import { ReportsService } from '../reports/reports.service';
import { SearchChallengeDto } from './dto/SearchChallengeDto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge) private challengeRepository: Repository<Challenge>,
    private subscriptionsService: SubscriptionsService,
    private reportsService: ReportsService,
  ) {}

  async create(userId: number, createChallengeDto: CreateChallengeDto) {
    const challenge = Challenge.fromCreateChallengeDto(createChallengeDto);
    challenge.authorId = userId;

    const { identifiers } = await this.challengeRepository.insert(challenge);
    const createdChallenge = await this.getById(identifiers[0].id);

    const createSubscriptionDto = new CreateSubscriptionDto(createdChallenge.id);

    await this.subscriptionsService.create(userId, createSubscriptionDto);

    return createdChallenge;
  }

  async getById(id: number) {
    return this.challengeRepository.findOne({ id });
  }

  async search(userId: number, skip = 0, take = 50) {
    const challenges = await this.challengeRepository.find({ where: { authorId: Not(userId) }, skip, take });

    const result: SearchChallengeDto[] = [];

    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];

      const searchChallengeDto = new SearchChallengeDto();
      searchChallengeDto.challenge = challenge;
      searchChallengeDto.totalParticipants = await this.subscriptionsService.countUsersByChallengeId(challenge.id);
      const subscriptions = await this.subscriptionsService.getSubscriptionsWithMaxUsers(challenge.id, 3);
      searchChallengeDto.avatars = subscriptions.map(subscription => subscription.user.avatar);

      result.push(searchChallengeDto);
    }

    return result;
  }

  async getChallengesByUserSubscriptions(userId: number) {
    const subscriptions = await this.subscriptionsService.getByUserId(userId);
    return this.challengeRepository.find({ where: { subscriptions } });
  }

  async getChallengeWithUserSubscription(userId: number, challengeId: number) {
    const subscription = await this.subscriptionsService.getByUserIdAndChallengeId(userId, challengeId);
    const challenge = await this.getById(challengeId);
    const reports = await this.reportsService.getBySubscriptionIdAndUserId(userId, subscription.id);

    return new ChallengeWithUserSubscriptionDto(challenge, subscription, reports);
  }
}
