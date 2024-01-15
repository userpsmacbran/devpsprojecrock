import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Country } from "src/entities/country.entity";
import { Repository } from "typeorm";
import { CreateCountryDto } from "./dto/create-country.dto";

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}
  async findAll() {
    const countries = await this.countryRepository.find();
    return { message: "ok", data: countries };
  }

  async findOne(id: number) {}

  async create(Country: CreateCountryDto) {
    const countryFound = await this.countryRepository.findOne({
      where: { name: Country.name },
    });
    if (countryFound) throw new HttpException("COUNTRY_EXIST", 400);
    const country = await this.countryRepository.save(Country);
    return { message: "ok", data: country };
  }
}
