import { IsNumber } from "class-validator"

export class CreateTransactionDto {
  @IsNumber()
  id: number

  @IsNumber()
  idUser: number

  @IsNumber()
  amount: number

  @IsNumber()
  type: number
}
