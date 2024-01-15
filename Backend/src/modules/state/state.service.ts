import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Country } from "src/entities/country.entity";
import { State } from "src/entities/state.entity";
import { Repository } from "typeorm";

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}
  async findAllByCountryId(countryId: number) {
    try {
      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });
      if (!country) {
        throw new HttpException("COUNTRY_NOT_FOUND", 404);
      }
      const states = await this.stateRepository.find({
        where: { country: { id: countryId } },
      });
      return { message: "ok", data: states };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(name: string, countryId: number) {
    try {
      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });
      if (!country) {
        throw new HttpException("COUNTRY_NOT_FOUND", 404);
      }
      const stateFound = await this.stateRepository.findOne({
        where: { name, country },
      });
      if (stateFound) throw new HttpException("STATE_EXIST", 400);
      
      const state = this.stateRepository.create({ name, country });
      await this.stateRepository.save(state);
      return { message: "ok", data: state };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
