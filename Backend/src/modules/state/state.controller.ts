import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { StateService } from "./state.service";
import { CreateStateDto } from "./dto/Create-state.dto";

@Controller("state")
export class StateController {
  constructor(private readonly StateService: StateService) {}

  @Get(":countryId")
  findAllByCountryId(@Param("countryId") countryId: number) {
    return this.StateService.findAllByCountryId(countryId);
  }
  @Post()
  create(@Body() body: CreateStateDto) {
    const { name, countryId } = body;
    return this.StateService.create(name, countryId);
  }
}
