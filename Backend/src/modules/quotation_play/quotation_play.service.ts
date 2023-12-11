import { HttpException, Injectable } from '@nestjs/common';
import { CalculatePriceDto } from './dto/create-quotation_play.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { YoutubeService } from '../youtube/youtube.service';
import { MODEPLAY } from 'src/constants/modePlay.enum';

@Injectable()
export class QuotationPlayService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService
  ) {}

  async calculatePrice(createQuotationPlayDto: CalculatePriceDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { r_id: createQuotationPlayDto.idUser }
      });

      const company = await this.userRepository.findOne({
        where: { r_id: createQuotationPlayDto.idCompany },
        relations: ['modePlays']
      });

      if (!user) throw new HttpException('Usuario no encontrado', 404);

      if (!company) throw new HttpException('Compañia no encontrada', 404);
      if (user.r_state_Wallet === 0) {
        const duration = await this.youtubeService.getDuration(
          createQuotationPlayDto.idVideo
        );
        return {
          cost: [
            {
              idModePlay: company.modePlays[0].r_id,
              title: company.modePlays[MODEPLAY.PLATINUM].r_title,
              cost:
                company.modePlays[MODEPLAY.PLATINUM].r_cost *
                Math.ceil(duration / 7),
              type: MODEPLAY.PLATINUM
            },
            {
              idModePlay: company.modePlays[1].r_id,
              title: company.modePlays[MODEPLAY.VIP].r_title,
              cost:
                company.modePlays[MODEPLAY.VIP].r_cost *
                Math.ceil(duration / 7),
              type: MODEPLAY.VIP
            },
            {
              idModePlay: company.modePlays[2].r_id,
              title: company.modePlays[MODEPLAY.NORMAL].r_title,
              cost:
                company.modePlays[MODEPLAY.NORMAL].r_cost *
                Math.ceil(duration / 7),
              type: MODEPLAY.NORMAL
            }
          ],
          idVideo: createQuotationPlayDto.idVideo,
          idCompany: user.r_id
        };
      } else {
        throw new HttpException('WALLET_INVALID', 400);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 400);
    }
  }

  findAll() {
    return `This action returns all quotationPlay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quotationPlay`;
  }
}
