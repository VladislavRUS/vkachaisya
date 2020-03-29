import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../../database/entities/File';
import { CreateFileDto } from './dto/CreateFileDto';
import { User } from '../../database/entities/User';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(File) private fileRepository: Repository<File>) {}

  async create(createFileDto: CreateFileDto) {
    const file = File.fromCreateFileDto(createFileDto);

    const { identifiers } = await this.fileRepository.insert(file);

    return this.getById(identifiers[0].id);
  }

  async getById(fileId: number) {
    return this.fileRepository.findOne({ id: fileId });
  }

  async getByUserId(userId: number) {
    const user = new User();
    user.id = userId;

    return this.fileRepository.find({ user });
  }

  async getManyByIds(fileIds: number[]) {
    return this.fileRepository.findByIds(fileIds);
  }
}
