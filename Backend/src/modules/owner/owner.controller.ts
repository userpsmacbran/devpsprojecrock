import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { create } from "domain";
import { CreateOwnerDto } from "./dto/create-owner.dto";

@Controller("owner")
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    return await this.ownerService.create(createOwnerDto);
  }

  @Get()
  async getById() {
    return await this.ownerService.getById();
  }
}
