import { Logger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  migrationsTableName: 'supplier_asset_typeorm_migrations',
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: true,
};
// Logger.log(dataSourceOptions, 'DataSourceOptions');
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
