import { HttpException, Injectable } from "@nestjs/common";
import { ConfirmPayUserDto } from "./dto/confirm_pay_user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { YoutubeService } from "../youtube/youtube.service";
import { PlayListCompanyService } from "../play_list_company/play_list_company.service";
import { transformTime } from "src/utils/transformTime";
import { TransactionsService } from "../transactions/transactions.service";
import { ModeplayService } from "../modeplay/modeplay.service";
import { ROLES } from "src/constants";
import { WalletService } from "../wallet/wallet.service";

@Injectable()
export class ConfirmPayUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService,
    private readonly modePlayService: ModeplayService,
    private readonly playListCompanyService: PlayListCompanyService,
    private readonly transactionService: TransactionsService,
    private readonly walletService: WalletService
  ) {}

  async create(confirmPayUserDto: ConfirmPayUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: confirmPayUserDto.idUser },
        relations: ["wallet"],
      });
      if (!user) return new HttpException("USER_NOT_FOUND", 404);
      if (user.type !== ROLES.CLIENTE)
        return new HttpException("USER_NOT_CLIENT", 400);

      const company = await this.userRepository.findOne({
        where: { id: confirmPayUserDto.idCompany },
      });

      if (!company) return new HttpException("COMPANY_NOT_FOUND", 404);
      if (company.type !== ROLES.EMPRESA)
        return new HttpException("USER_NOT_COMPANY", 400);

      if (user.state_Wallet === 0) {
        const duration = await this.youtubeService.getDuration(
          confirmPayUserDto.idVideo
        );
        const { type, value } = await this.modePlayService.findOne(
          confirmPayUserDto.typeCompany
        );

        const costTotal = Math.ceil(value * (duration / 7));
        console.log("costo de la reproduccion: " + costTotal);
        const dataVideo = await this.youtubeService.findById(
          confirmPayUserDto.idVideo
        );

        const amountUserDecryptedString =
          await this.walletService.getDecryptedAmount(user.wallet.id);
        const amountUserDecrypted = parseInt(amountUserDecryptedString);

        const remainingAmount = amountUserDecrypted - costTotal;
        if (remainingAmount >= 0) {
          await this.walletService.updateNewAmount(
            user.wallet.id,
            remainingAmount
          );

          await this.transactionService.createForPayMusic({
            idUser: user.id,
            type: 0,
            amount: costTotal,
            companyId: confirmPayUserDto.idCompany,
            videoId: confirmPayUserDto.idVideo,
          });
        } else {
          return new HttpException("INSUFFICIENT_CREDITS", 500);
        }
        await this.playListCompanyService.create({
          idVideo: confirmPayUserDto.idVideo,
          idCompany: company.id,
          idUser: user.id,
          order: 0,
          duration: transformTime(duration),
          state: 1,
          title: dataVideo.title,
          description: dataVideo.description,
          thumbnailsDefault: dataVideo.miniaturas.default.url,
          thumbnailsMedium: dataVideo.miniaturas.medium.url,
          thumbnailsHigh: dataVideo.miniaturas.high.url,
          fullScreen: false,
        });

        return { message: "Pago exitoso", turn: 1 };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
