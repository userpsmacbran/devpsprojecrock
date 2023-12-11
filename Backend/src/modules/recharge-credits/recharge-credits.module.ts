import { Module } from '@nestjs/common';
import { RechargeCreditsService } from './recharge-credits.service';
import { RechargeCreditsController } from './recharge-credits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User])],
  controllers: [RechargeCreditsController],
  providers: [RechargeCreditsService],
})
export class RechargeCreditsModule {}
