import { Module } from "@nestjs/common";
import { QuotationPlayService } from "./quotation_play.service";
import { QuotationPlayController } from "./quotation_play.controller";
import { User } from "src/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { YoutubeModule } from "../youtube/youtube.module";
import { ModeplayModule } from "../modeplay/modeplay.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), YoutubeModule, ModeplayModule],
  controllers: [QuotationPlayController],
  providers: [QuotationPlayService],
  exports: [QuotationPlayService],
})
export class QuotationPlayModule {}
