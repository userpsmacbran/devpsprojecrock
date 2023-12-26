import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(":idUser")
  findAllById(@Param("idUser") idUser: number) {
    return this.transactionsService.findAllById(idUser);
  }
}
