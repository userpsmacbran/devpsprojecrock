import { Injectable } from '@nestjs/common';
import { RechargeCreditDto } from './dto/create-recharge-credit.dto';

@Injectable()
export class RechargeCreditsService {
  create(createRechargeCreditDto: RechargeCreditDto) {
    return 'This action adds a new rechargeCredit';
  }

  findAll() {
    return `This action returns all rechargeCredits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rechargeCredit`;
  }

  update(id: number, updateRechargeCreditDto: RechargeCreditDto) {
    return `This action updates a #${id} rechargeCredit`;
  }

  remove(id: number) {
    return `This action removes a #${id} rechargeCredit`;
  }
}
