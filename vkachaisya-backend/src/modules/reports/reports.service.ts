import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../../database/entities/Report';
import { CreateReportDto } from './dto/CreateReportDto';
import { UpdateReportDto } from './dto/UpdateReportDto';
import { FilesService } from '../files/files.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    private filesService: FilesService,
  ) {}

  async create(userId: number, createReportDto: CreateReportDto) {
    const report = Report.fromCreateReportDto(createReportDto);

    const { identifiers } = await this.reportRepository.insert(report);
    const createdId = identifiers[0].id;

    const createdReport = await this.getById(createdId);
    createdReport.files = await this.filesService.getManyByIds(createReportDto.fileIds);

    await this.reportRepository.save(createdReport);

    return createdReport;
  }

  async getById(reportId: number, relations: string[] = []) {
    return this.reportRepository.findOne({ id: reportId }, { relations });
  }

  async getByIdSubscriptionId(subscriptionId: number) {
    return this.reportRepository.find({ where: { subscription: { id: subscriptionId } }, relations: ['files'] });
  }

  async getBySubscriptionIdAndUserId(userId, subscriptionId: number) {
    return this.reportRepository.find({
      where: { user: { id: userId }, subscription: { id: subscriptionId } },
      relations: ['files'],
    });
  }

  async update(reportId: number, updateReportDto: UpdateReportDto) {
    const report = await this.getById(reportId, ['files']);

    const currentFiles = report.files;

    const newFilesIds = updateReportDto.fileIds.filter(fileId => !currentFiles.find(file => file.id === fileId));
    const newFiles = await this.filesService.getManyByIds(newFilesIds);

    const allFiles = [...currentFiles, ...newFiles];

    report.files = allFiles.filter(file => updateReportDto.fileIds.includes(file.id));
    report.text = updateReportDto.text;
    await this.reportRepository.save(report);

    return this.getById(reportId, ['files']);
  }
}
