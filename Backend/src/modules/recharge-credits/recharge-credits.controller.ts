import { Controller, Post, Body } from '@nestjs/common';
import { RechargeCreditsService } from './recharge-credits.service';
import { RechargeCreditDto } from './dto/create-recharge-credit.dto';

@Controller('recharge-credits')
export class RechargeCreditsController {
  constructor(
    private readonly rechargeCreditsService: RechargeCreditsService
  ) {}

  @Post()
  create(@Body() createRechargeCreditDto: RechargeCreditDto) {
    return this.rechargeCreditsService.create(createRechargeCreditDto);
  }
}
