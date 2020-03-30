import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Subscription } from './Subscription';
import { File } from './File';
import { CreateUserDto } from '../../modules/users/dto/CreateUserDto';

@Entity()
export class User {
  static fromCreateUserDto(createUserDto: CreateUserDto) {
    const user = new User();

    user.id = createUserDto.id;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.avatar = createUserDto.avatar;

    return user;
  }

  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;

  @OneToMany(
    () => Subscription,
    subscription => subscription.user,
  )
  subscriptions: Subscription[];

  @OneToMany(
    () => File,
    file => file.user,
  )
  files: File[];
}
