import { IsNumber } from "class-validator";

export class UpdatePlayListCompanyDto {
  @IsNumber()
  idUser: number;

  @IsNumber()
  idCompany: number

  @IsNumber()
  state: number
}
