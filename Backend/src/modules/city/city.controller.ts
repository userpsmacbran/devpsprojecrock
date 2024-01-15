import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CityService } from "./city.service";
import { CreateCityDto } from "./dto/Create-city.dto";

@Controller("city")
export class CityController {
  constructor(private readonly CityService: CityService) {}

  @Get(":stateId")
  findAllByStateId(@Param("stateId") stateId: number) {
    return this.CityService.findAllByStateId(stateId);
  }

  @Post()
  create(@Body() body: CreateCityDto) {
    const { name, stateId } = body;
    return this.CityService.create(name, stateId);
  }
}
