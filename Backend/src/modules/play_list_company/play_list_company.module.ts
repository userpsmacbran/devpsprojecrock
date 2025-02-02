import { Module } from '@nestjs/common';
import { PlayListCompanyService } from './play_list_company.service';
import { PlayListCompanyController } from './play_list_company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayListCompany } from 'src/entities/playListCompany.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayListCompany]), TypeOrmModule.forFeature([User])],
  controllers: [PlayListCompanyController],
  providers: [PlayListCompanyService],
  exports: [PlayListCompanyService]
})
export class PlayListCompanyModule {}
