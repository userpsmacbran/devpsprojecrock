import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConfirmPayUserService } from './confirm_pay_user.service';
import { ConfirmPayUserDto } from './dto/confirm_pay_user.dto';

@Controller('confirm-pay-user')
export class ConfirmPayUserController {
  constructor(private readonly confirmPayUserService: ConfirmPayUserService) {}

  @Post()
  create(@Body() confirmPayUserDto: ConfirmPayUserDto) {
    return this.confirmPayUserService.create(confirmPayUserDto);
  }
}
