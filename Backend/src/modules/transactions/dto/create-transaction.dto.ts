import { IsNumber } from "class-validator"

export class CreateTransactionDto {
  @IsNumber()
  idUser: number

  @IsNumber()
  amount: number

  @IsNumber()
  type: number
}
