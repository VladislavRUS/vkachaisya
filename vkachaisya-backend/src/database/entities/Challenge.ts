import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateChallengeDto } from '../../modules/challenges/dto/CreateChallengeDto';
import { Subscription } from './Subscription';

@Entity()
export class Challenge {
  static fromCreateChallengeDto(createChallengeDto: CreateChallengeDto) {
    const challenge = new Challenge();

    challenge.title = createChallengeDto.title;
    challenge.description = createChallengeDto.description;
    challenge.days = createChallengeDto.days;
    challenge.reportType = createChallengeDto.reportType;

    return challenge;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  days: number;

  @Column()
  reportType: ChallengeReportType;

  @Column()
  authorId: number;

  @OneToMany(
    () => Subscription,
    subscription => subscription.challenge,
  )
  subscriptions: Subscription[];
}

export enum ChallengeReportType {
  CHECK = 'check',
  POST = 'post',
}
