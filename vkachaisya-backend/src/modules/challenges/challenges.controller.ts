import { Body, Controller, Post, Headers, Get, Param, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/CreateChallengeDto';

@Controller('challenges')
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Get()
  async getChallenges(@Headers() headers: any) {
    const userId = parseInt(headers['userId']);

    return this.challengesService.getChallengesByUserSubscriptions(userId);
  }

  @Get('/search')
  async searchChallenges(@Headers() headers: any) {
    const userId = parseInt(headers['userId']);
    return this.challengesService.search(userId);
  }

  @Get('/:challengeId')
  async getChallenge(
    @Headers() headers: any,
    @Param('challengeId') challengeId: number,
    @Query('userId') userId: number,
  ) {
    return this.challengesService.getChallengeWithUserSubscription(userId, challengeId);
  }

  @Post()
  async createChallenge(@Headers() headers: any, @Body() createChallengeDto: CreateChallengeDto) {
    const userId = parseInt(headers['userId']);

    return this.challengesService.create(userId, createChallengeDto);
  }
}
