import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/create-country.dto";

@Controller("country")
export class CountryController {
  constructor(private readonly CountryService: CountryService) {}

  @Get()
  findAll() {
    return this.CountryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.CountryService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCountryDto) {
    return this.CountryService.create(body);
  }
}
