import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { DuplicateKeyFilter } from './utils/DuplicateKeyFilters.util';
import { YoutubeModule } from './modules/youtube/youtube.module';
import { ModeplayModule } from './modules/modeplay/modeplay.module';
import { QuotationPlayModule } from './modules/quotation_play/quotation_play.module';
import { ConfirmPayUserModule } from './modules/confirm_pay_user/confirm_pay_user.module';
import { PlayListCompanyModule } from './modules/play_list_company/play_list_company.module';
import { RechargeCreditsModule } from './modules/recharge-credits/recharge-credits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    CompanyModule,
    UserModule,
    AuthModule,
    YoutubeModule,
    ModeplayModule,
    QuotationPlayModule,
    ConfirmPayUserModule,
    PlayListCompanyModule,
    RechargeCreditsModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyFilter
    }
  ]
})
export class AppModule {
  static port: number | string;
}
