import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlayListCompanyDto } from './dto/create-play_list_company.dto';
import { UpdatePlayListCompanyDto } from './dto/update-play_list_company.dto';
import { PlayListCompany } from 'src/entities/playListCompany.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PlayListCompanyService {
  constructor(
    @InjectRepository(PlayListCompany)
    private readonly playListCompanyRepository: Repository<PlayListCompany>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createPlayListCompanyDto: CreatePlayListCompanyDto) {
    try {
      const {
        idVideo,
        idCompany,
        idUser,
        order,
        duration,
        state,
        title,
        description,
        thumbnailsDefault,
        thumbnailsMedium,
        thumbnailsHigh,
        fullScreen
      } = createPlayListCompanyDto;
      const playListCompany = await this.playListCompanyRepository.save({
        r_id_video: idVideo,
        r_id_company: idCompany,
        r_id_user: idUser,
        r_order: order,
        r_duration: duration,
        r_state: state,
        r_title: title,
        r_description: description,
        r_thumbnails_default: thumbnailsDefault,
        r_thumbnails_medium: thumbnailsMedium,
        r_thumbnails_high: thumbnailsHigh,
        fullScreen: fullScreen
      });

      return {
        id: playListCompany.r_id,
        idVideo: playListCompany.r_id_video,
        idCompany: playListCompany.r_id_company,
        idUser: playListCompany.r_id_user,
        order: playListCompany.r_order,
        duration: playListCompany.r_duration,
        state: playListCompany.r_state,
        title: playListCompany.r_title,
        descrption: playListCompany.r_description,
        thumbnailsDefault: playListCompany.r_thumbnails_default,
        thumbnailsMedium: playListCompany.r_thumbnails_medium,
        thumbnailsHigh: playListCompany.r_thumbnails_high,
        fullScreen: playListCompany.fullScreen
      };
    } catch (error) {
      throw new HttpException('Datos incorrectos', 404);
    }
  }

  findAll() {
    return `This action returns all playListCompany`;
  }

  async findByIdCompany(id: number) {
    try {
      const company = await this.userRepository.findOne({ where: { r_id: id } });
      if (!company) {
        throw new HttpException('Compañia no existe', 400);
      }

      const dataRaw = await this.playListCompanyRepository.find({
        where: { r_id_company: id }
      });

      if (dataRaw.length < 1) {
        throw new HttpException('No hay listar por mostrar', 400);
      }

      const cleanData = dataRaw.map((list) => {
        return {
          id: list.r_id,
          idVideo: list.r_id_video,
          idCompany: list.r_id_company,
          idUser: list.r_id_user,
          order: list.r_order,
          duration: list.r_duration,
          state: list.r_state,
          title: list.r_title,
          descrption: list.r_description,
          thumbnailsDefault: list.r_thumbnails_default,
          thumbnailsMedium: list.r_thumbnails_medium,
          thumbnailsHigh: list.r_thumbnails_high,
          fullScreen: list.fullScreen
        };
      });

      const listOrder = cleanData.sort((a, b) => {
        return a.order - b.order;
      });

      return {
        message: 'Exito',
        arrayList: listOrder
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async update(id: number, updatePlayListCompanyDto: UpdatePlayListCompanyDto) {

    if(updatePlayListCompanyDto.state === 2){
      throw new HttpException('La playlist esta finalizada', 400);
    }

    await this.playListCompanyRepository.update(id, {r_state: updatePlayListCompanyDto.state})
  
    return {
      message: 'Exito',
      idPlaylist: id,
      state: updatePlayListCompanyDto.state
    }
  }

  remove(id: number) {
    return `This action removes a #${id} playListCompany`;
  }
}
