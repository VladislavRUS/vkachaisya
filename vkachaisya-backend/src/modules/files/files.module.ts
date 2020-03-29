import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../../database/entities/File';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

export const UPLOAD_FOLDER = join(process.cwd(), '.', 'upload');

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          if (!fs.existsSync(UPLOAD_FOLDER)) {
            fs.mkdirSync(UPLOAD_FOLDER);
          }

          cb(null, UPLOAD_FOLDER);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
