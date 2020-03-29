import { Body, Controller, Post, Headers, Put, Param, ForbiddenException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/CreateReportDto';
import { UpdateReportDto } from './dto/UpdateReportDto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService, private subscriptionsService: SubscriptionsService) {}

  @Post()
  async createReport(@Headers() headers: any, @Body() createReportDto: CreateReportDto) {
    const userId = parseInt(headers['userId']);

    const subscription = await this.subscriptionsService.getById(createReportDto.subscriptionId, ['user']);

    if (subscription.user.id !== userId) {
      throw new ForbiddenException();
    }

    return this.reportsService.create(userId, createReportDto);
  }

  @Put('/:reportId')
  async updateReport(@Body() updateReportDto: UpdateReportDto, @Param('reportId') reportId: number) {
    return this.reportsService.update(reportId, updateReportDto);
  }
}
