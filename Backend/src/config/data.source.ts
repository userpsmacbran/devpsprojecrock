import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_URL'),
  ssl: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true
};

export const AppDS = new DataSource(DataSourceConfig);
