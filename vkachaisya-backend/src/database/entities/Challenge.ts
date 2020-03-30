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
    challenge.withReport = createChallengeDto.withReport;
    challenge.hashtag = createChallengeDto.hashtag;

    return challenge;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  hashtag: string;

  @Column()
  days: number;

  @Column()
  withReport: boolean;

  @Column()
  authorId: number;

  @OneToMany(
    () => Subscription,
    subscription => subscription.challenge,
  )
  subscriptions: Subscription[];
}
