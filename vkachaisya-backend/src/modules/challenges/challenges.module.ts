import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../../database/entities/Challenge';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { Subscription } from '../../database/entities/Subscription';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, Subscription]), SubscriptionsModule, ReportsModule],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
