import { Module } from '@nestjs/common';
import { RechargeCreditsService } from './recharge-credits.service';
import { RechargeCreditsController } from './recharge-credits.controller';

@Module({
  controllers: [RechargeCreditsController],
  providers: [RechargeCreditsService],
})
export class RechargeCreditsModule {}
