import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Subscription } from './Subscription';
import { File } from './File';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

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
