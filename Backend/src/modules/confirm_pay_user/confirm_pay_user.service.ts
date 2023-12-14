import { HttpException, Injectable } from '@nestjs/common';
import { ConfirmPayUserDto } from './dto/confirm_pay_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { YoutubeService } from '../youtube/youtube.service';
import { PlayListCompanyService } from '../play_list_company/play_list_company.service';
import { transformTime } from 'src/utils/transformTime';
import { TransactionsService } from '../transactions/transactions.service';
import { ModeplayService } from '../modeplay/modeplay.service';

@Injectable()
export class ConfirmPayUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService,
    private readonly modePlayService: ModeplayService,
    private readonly playListCompanyService: PlayListCompanyService,
    private readonly transctionService: TransactionsService
  ) {}

  async create(confirmPayUserDto: ConfirmPayUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { r_id: confirmPayUserDto.idUser }
      });

      const company = await this.userRepository.findOne({
        where: { r_id: confirmPayUserDto.idCompany },
        relations: ['modePlays']
      });

      if (!user) throw new HttpException('Usuario no encontrado', 404);

      if (!company) throw new HttpException('Compañia no encontrada', 404);

      if (user.r_state_Wallet === 0) {
        const duration = await this.youtubeService.getDuration(
          confirmPayUserDto.idVideo
        );

        const { data } = await this.modePlayService.findOne(
          confirmPayUserDto.idModePlay
        );

        const { cost, type } = data;

        const costTotal = Math.ceil(cost * (duration / 7));

        const dataVideo = await this.youtubeService.findById(
          confirmPayUserDto.idVideo
        );

        if (user.r_wallet - costTotal >= 0) {
          user.r_wallet = user.r_wallet - costTotal;
          await this.userRepository.save(user);
          await this.transctionService.create({
            idUser: user.r_id,
            type: user.r_type,
            amount: costTotal
          });
        } else {
          throw new HttpException('Creditos insuficientes', 400);
        }

        await this.playListCompanyService.create({
          idVideo: confirmPayUserDto.idVideo,
          idCompany: company.r_id,
          idUser: user.r_id,
          order: type,
          duration: transformTime(duration),
          state: 1,
          title: dataVideo.title,
          description: dataVideo.description,
          thumbnailsDefault: dataVideo.miniaturas.default.url,
          thumbnailsMedium: dataVideo.miniaturas.medium.url,
          thumbnailsHigh: dataVideo.miniaturas.high.url,
          fullScreen: false
        });
        return { message: 'Pago exitoso', turn: 1 };
      }
    } catch (error) {}
  }
}
