import { Controller, Headers, Get, Post, Body, ConflictException, Param, Query } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/CreateSubscriptionDto';
import { ReportsService } from '../reports/reports.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService, private reportsService: ReportsService) {}

  @Post()
  async createSubscription(@Headers() headers: any, @Body() createSubscriptionDto: CreateSubscriptionDto) {
    const userId = parseInt(headers['userId']);

    const subscription = await this.subscriptionsService.getByUserIdAndChallengeId(
      userId,
      createSubscriptionDto.challengeId,
    );

    if (subscription) {
      throw new ConflictException();
    }

    return this.subscriptionsService.create(userId, createSubscriptionDto);
  }

  @Get()
  async getUserSubscriptions(@Headers() headers: any) {
    const userId = parseInt(headers['userId']);
    return this.subscriptionsService.getByUserId(userId);
  }

  @Get('/:subscriptionId/result')
  async getSubscriptionResult(@Param('subscriptionId') subscriptionId: number) {
    return this.subscriptionsService.getSubscriptionResult(subscriptionId);
  }

  @Get('/:subscriptionId/reports')
  async getSubscriptionReports(@Param('subscriptionId') subscriptionId: number) {
    return this.reportsService.getByIdSubscriptionId(subscriptionId);
  }
}
