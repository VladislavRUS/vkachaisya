import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Challenge } from './Challenge';
import { Report } from './Report';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @ManyToOne(
    () => User,
    user => user.subscriptions,
  )
  user: User;

  @ManyToOne(
    () => Challenge,
    challenge => challenge.subscriptions,
  )
  challenge: Challenge;

  @ManyToOne(
    () => Report,
    report => report.subscription,
  )
  reports: Report[];
}
