import { HttpException, Injectable } from '@nestjs/common';
import { ConfirmPayUserDto } from './dto/confirm_pay_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { YoutubeService } from '../youtube/youtube.service';
import { QuotationPlayService } from '../quotation_play/quotation_play.service';
import { PlayListCompanyService } from '../play_list_company/play_list_company.service';
import { MODEPLAY } from 'src/constants';
import { transformTime } from 'src/utils/transformTime';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class ConfirmPayUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly youtubeService: YoutubeService,
    private readonly quotationPlayService: QuotationPlayService,
    private readonly playListCompanyService: PlayListCompanyService,
    private readonly transctionService: TransactionsService
  ) {}

  async create(confirmPayUserDto: ConfirmPayUserDto) {
    const { idUser, idCompany, idVideo } = confirmPayUserDto;

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
      const dataRaw = await this.quotationPlayService.calculatePrice({
        idUser,
        idCompany,
        idVideo
      });
      const cost = dataRaw.cost.filter(
        (mode) => mode.type === confirmPayUserDto.modePlay
      )[0].cost;

      console.log(cost);

      const duration = await this.youtubeService.getDuration(
        confirmPayUserDto.idVideo
      );

      const dataVideo = await this.youtubeService.findById(
        confirmPayUserDto.idVideo
      );

      if (user.r_wallet - cost >= 0) {
        user.r_wallet = user.r_wallet - cost;
        console.log(user.r_wallet);
        await this.userRepository.save(user);
        await this.transctionService.create({idUser: user.r_id, type: user.r_type, amount: cost})
      } else {
        throw new HttpException('Creditos insuficientes', 400);
      }

      await this.playListCompanyService.create({
        idVideo: [confirmPayUserDto.idVideo],
        idCompany: company.r_id,
        idUser: user.r_id,
        order: confirmPayUserDto.modePlay,
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
  }

  findAll() {
    return `This action returns all confirmPayUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confirmPayUser`;
  }
}
