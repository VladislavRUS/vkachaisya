import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from './Report';
import { CreateFileDto } from '../../modules/files/dto/CreateFileDto';
import { User } from './User';

@Entity()
export class File {
  static fromCreateFileDto(createFileDto: CreateFileDto) {
    const file = new File();

    file.name = createFileDto.name;
    file.path = createFileDto.path;
    file.type = createFileDto.type;

    const user = new User();
    user.id = createFileDto.userId;
    file.user = user;

    return file;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @ManyToOne(
    () => Report,
    report => report.files,
  )
  report: Report;

  @ManyToOne(
    () => User,
    user => user.files,
  )
  user: User;
}
