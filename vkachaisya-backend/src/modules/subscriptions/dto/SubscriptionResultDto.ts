import { User } from '../../../database/entities/User';
import { Challenge } from '../../../database/entities/Challenge';

export class SubscriptionResultDto {
  id: number;
  title: string;
  hashtag: string;
  startDate: string;
  days: number;
  users: User[];
  challenge: Challenge;
}
