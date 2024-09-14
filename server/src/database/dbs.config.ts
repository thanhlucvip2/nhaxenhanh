import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_LOGGING,
  DB_SYNC,
} from '@configs/app.config';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DBS: (DataSourceOptions & TypeOrmModuleOptions)[] = [
  {
    name: 'default',
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: DB_SYNC,
    logging: DB_LOGGING,
    autoLoadEntities: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  },
];
