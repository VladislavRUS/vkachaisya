import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './File';
import { Subscription } from './Subscription';
import { CreateReportDto } from '../../modules/reports/dto/CreateReportDto';

@Entity()
export class Report {
  static fromCreateReportDto(createReportDto: CreateReportDto) {
    const report = new Report();
    report.text = createReportDto.text;
    report.day = createReportDto.day;

    const subscription = new Subscription();
    subscription.id = createReportDto.subscriptionId;
    report.subscription = subscription;

    return report;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Subscription,
    subscription => subscription.reports,
  )
  subscription: Subscription;

  @OneToMany(
    () => File,
    file => file.report,
  )
  files: File[];

  @Column()
  text: string;

  @Column()
  day: number;
}
