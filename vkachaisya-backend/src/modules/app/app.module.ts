import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ChallengesModule } from '../challenges/challenges.module';
import { UsersModule } from '../users/users.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { FilesModule } from '../files/files.module';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [DatabaseModule, UsersModule, ChallengesModule, SubscriptionsModule, FilesModule, ReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
