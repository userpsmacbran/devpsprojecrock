import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Screen } from "src/entities/screen.entity";
import { ScreenService } from "./screen.service";
import { ScreenController } from "./screen.controller";
import { User } from "src/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Screen, User]),
 
  ],
  controllers: [ScreenController],
  providers: [ScreenService],
  exports: [ScreenService],
})
export class ScreenModule {}
