import { Body, Controller, Get, Headers, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/CreateFileDto';
import config from '../../../config.json';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  async getCurrentUserFiles(@Headers() headers: any) {
    const userId = headers['userId'];
    return this.filesService.getByUserId(userId);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@UploadedFile() file, @Headers() headers: any, @Body() body: any) {
    const userId = headers['userId'];

    const createFileDto = new CreateFileDto();
    createFileDto.userId = userId;
    createFileDto.name = file.filename;
    createFileDto.path = config.staticHostPath + file.filename;
    createFileDto.type = body.type;

    return this.filesService.create(createFileDto);
  }
}
