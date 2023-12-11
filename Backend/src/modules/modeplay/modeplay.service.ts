import { Injectable } from '@nestjs/common';
import { CreateModeplayDto } from './dto/create-modeplay.dto';
import { UpdateModeplayDto } from './dto/update-modeplay.dto';
import { ModePlay } from 'src/entities/modePlay.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MODEPLAY } from 'src/constants';
import { COST_MODEPLAY } from 'src/constants/modePlay.enum';

@Injectable()
export class ModeplayService {
  constructor(
    @InjectRepository(ModePlay)
    private readonly modePlayRepository: Repository<ModePlay>
  ) {}

  async create({ idCompany, title }: CreateModeplayDto) {
    try {
      return await this.modePlayRepository.save({
        r_id_company: idCompany,
        r_cost: COST_MODEPLAY[title],
        r_title: title,
        r_type: Number(MODEPLAY[title])
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all modeplay`;
  }

  async findOne(id: number) {
    const mode = await this.modePlayRepository.findOne({ where: { r_id: id } });
    return {
      id: mode.r_id,
      idCompany: mode.r_id_company,
      cost: mode.r_cost,
      title: mode.r_title,
      type: mode.r_type
    };
  }

  update(id: number, updateModeplayDto: UpdateModeplayDto) {
    return `This action updates a #${id} modeplay`;
  }

  remove(id: number) {
    return `This action removes a #${id} modeplay`;
  }
}
