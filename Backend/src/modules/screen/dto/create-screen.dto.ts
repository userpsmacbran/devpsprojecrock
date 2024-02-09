import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateScreenDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  idCompany: number;
}
