import { ChallengeReportType } from '../../../database/entities/Challenge';

export class CreateChallengeDto {
  title: string;
  description: string;
  days: number;
  reportType: ChallengeReportType;
}
