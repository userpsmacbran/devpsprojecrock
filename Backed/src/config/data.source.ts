import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  ssl: {
    rejectUnauthorized: false
  },
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../**/*.migrations/*{.ts,.js}'],
  synchronize: true
};

export const AppDS = new DataSource(DataSourceConfig);
