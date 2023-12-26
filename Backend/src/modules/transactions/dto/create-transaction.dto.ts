import { IsNumber, IsString } from "class-validator";
import { User } from "src/entities/user.entity";

export class CreateTransactionDto {
  @IsNumber()
  idUser: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  type: number;

  companyId?: number;

  videoId?: string;
}
