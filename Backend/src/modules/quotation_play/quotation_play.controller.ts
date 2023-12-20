import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { QuotationPlayService } from "./quotation_play.service";
import { CalculatePriceDto } from "./dto/create-quotation_play.dto";

@Controller("quotation-play")
export class QuotationPlayController {
  constructor(private readonly quotationPlayService: QuotationPlayService) {}

  @Post()
  create(@Body() createQuotationPlayDto: CalculatePriceDto) {
    return this.quotationPlayService.calculatePrice(createQuotationPlayDto);
  }
}
