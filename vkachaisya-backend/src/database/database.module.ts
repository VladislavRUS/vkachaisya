import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../config.json';
import { User } from './entities/User';
import { Challenge } from './entities/Challenge';
import { Subscription } from './entities/Subscription';
import { Report } from './entities/Report';
import { File } from './entities/File';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: config.databasePort,
  username: config.databaseUsername,
  password: config.databasePassword,
  database: config.databaseName,
  entities: [User, Challenge, Subscription, File, Report],
  synchronize: true,
  dropSchema: true,
});
