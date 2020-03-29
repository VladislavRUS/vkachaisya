import { Challenge } from '../../../database/entities/Challenge';
import { Subscription } from '../../../database/entities/Subscription';
import { Report } from '../../../database/entities/Report';

export class ChallengeWithUserSubscriptionDto {
  constructor(public challenge: Challenge, public subscription: Subscription, public reports: Report[]) {}
}
