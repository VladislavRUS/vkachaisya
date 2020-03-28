import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../config.json';

export const DatabaseModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: config.databasePort,
  username: config.databaseUsername,
  password: config.databasePassword,
  database: config.databaseName,
  entities: [],
  synchronize: true,
  dropSchema: true,
});
