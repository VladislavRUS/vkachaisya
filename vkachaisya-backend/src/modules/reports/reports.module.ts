import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../../database/entities/Report';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), forwardRef(() => SubscriptionsModule), FilesModule],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
