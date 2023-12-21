import { HttpException, Injectable } from "@nestjs/common";
import { CalculatePriceDto } from "./dto/create-quotation_play.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { YoutubeService } from "../youtube/youtube.service";
import { MODEPLAY } from "src/constants/modePlay.enum";

@Injectable()
export class QuotationPlayService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService
  ) {}

  async calculatePrice(createQuotationPlayDto: CalculatePriceDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createQuotationPlayDto.idUser },
      });

      const company = await this.userRepository.findOne({
        where: { id: createQuotationPlayDto.idCompany },
        relations: ["modePlays"],
      });

      if (!user) throw new HttpException("Usuario no encontrado", 404);

      if (!company) throw new HttpException("Compañia no encontrada", 404);
      if (user.state_Wallet === 0) {
        const duration = await this.youtubeService.getDuration(
          createQuotationPlayDto.idVideo
        );
        return {
          cost: [
            {
              idModePlay: company.modePlays[0].id,
              title: company.modePlays[MODEPLAY.PLATINUM].title,
              cost:
                company.modePlays[MODEPLAY.PLATINUM].value *
                Math.ceil(duration / 7),
              type: MODEPLAY.PLATINUM,
            },
            {
              idModePlay: company.modePlays[1].id,
              title: company.modePlays[MODEPLAY.VIP].title,
              cost:
                company.modePlays[MODEPLAY.VIP].value * Math.ceil(duration / 7),
              type: MODEPLAY.VIP,
            },
            {
              idModePlay: company.modePlays[2].id,
              title: company.modePlays[MODEPLAY.NORMAL].title,
              cost:
                company.modePlays[MODEPLAY.NORMAL].value *
                Math.ceil(duration / 7),
              type: MODEPLAY.NORMAL,
            },
          ],
          idVideo: createQuotationPlayDto.idVideo,
          idCompany: user.id,
        };
      } else {
        throw new HttpException("WALLET_INVALID", 400);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 400);
    }
  }
}
