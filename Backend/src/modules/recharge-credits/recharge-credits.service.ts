import { HttpException, Injectable } from '@nestjs/common';
import { RechargeCreditDto } from './dto/create-recharge-credit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class RechargeCreditsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly transctionService: TransactionsService
  ) {}
  async recharge(rechargeCreditDto: RechargeCreditDto) {
    if (rechargeCreditDto.idRgecharger === 1) {
      const user = await this.userRepository.findOne({
        where: { r_id: rechargeCreditDto.idUser }
      });
      console.log(user);

      if (!user) {
        throw new HttpException('Usuario no encontrado', 400);
      }

      await this.userRepository.update(rechargeCreditDto.idUser, {
        r_wallet: user.r_wallet + rechargeCreditDto.mount
      });

      const mount = await this.userRepository.findOne({
        where: { r_id: rechargeCreditDto.idUser }
      });

      await this.transctionService.create({
        idUser: user.r_id,
        type: user.r_type,
        amount: rechargeCreditDto.mount
      });

      return {
        message: 'Wallet actualizado',
        balance: mount.r_wallet
      };
    } else {
      throw new HttpException('idRecharger no coincide', 400);
    }
  }
}
