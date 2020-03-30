import { Challenge } from '../../../database/entities/Challenge';

export class SearchChallengeDto {
  challenge: Challenge;
  totalParticipants: number;
  avatars: string[];
}
