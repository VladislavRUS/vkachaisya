import { User } from '../../../database/entities/User';

export class SubscriptionResultDto {
  id: number;
  title: string;
  hashtag: string;
  startDate: string;
  days: number;
  users: User[];
}
