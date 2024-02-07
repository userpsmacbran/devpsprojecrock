import { HttpException, Injectable } from "@nestjs/common";
import { CalculatePriceDto } from "./dto/create-quotation_play.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { YoutubeService } from "../youtube/youtube.service";
import {
  COST_MODEPLAY,
  MODEPLAY,
  NAME_MODEPLAY,
} from "src/constants/modePlay.enum";
import { ROLES } from "src/constants";
import { ModeplayService } from "../modeplay/modeplay.service";
import convertMilisecondsToTime from "src/utils/convertMilisecondsToTime";
import calculatePriceByDuration from "src/utils/calculatePriceByDuration";

@Injectable()
export class QuotationPlayService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService,
    private readonly modeplayService: ModeplayService
  ) {}

  async calculatePrice(createQuotationPlayDto: CalculatePriceDto) {
    try {
      const company = await this.userRepository.findOne({
        where: { id: createQuotationPlayDto.idCompany },
      });

      if (!company) throw new HttpException("COMPANY_NOT_FOUND", 404);
      if (company.type !== ROLES.EMPRESA)
        throw new HttpException("USER_NOT_COMPANY", 400);

      const modeplays = await this.modeplayService.findAll();
      const idVideos = createQuotationPlayDto.idVideo.split(",");

      const prices = await Promise.all(
        idVideos.map(async (idVideo) => {
          const duration = await this.youtubeService.getDuration(idVideo);
          const price = calculatePriceByDuration(duration);
          return {
            VIDEO: {
              costs: {
                [NAME_MODEPLAY.PLATINUM]: {
                  price: price * COST_MODEPLAY.PLATINUM,
                  title: modeplays.find((m) => m.type === MODEPLAY.PLATINUM)
                    .title,
                  type: MODEPLAY.PLATINUM,
                },
                [NAME_MODEPLAY.VIP]: {
                  price: price * COST_MODEPLAY.VIP,
                  title: modeplays.find((m) => m.type === MODEPLAY.VIP).title,
                  type: MODEPLAY.VIP,
                },
                [NAME_MODEPLAY.NORMAL]: {
                  price: price * COST_MODEPLAY.NORMAL,
                  title: modeplays.find((m) => m.type === MODEPLAY.NORMAL)
                    .title,
                  type: MODEPLAY.NORMAL,
                },
              },
              duration: convertMilisecondsToTime(duration),
            },
          };
        })
      );

      return {
        message: "Ok",
        data: {
          prices,
          company,
        },
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 400);
    }
  }
}
