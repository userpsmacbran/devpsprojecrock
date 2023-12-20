import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MODEPLAY } from "src/constants";

export class ConfirmPayUserDto {
  @IsString()
  idVideo: string;

  @IsNumber()
  idCompany: number;

  @IsNumber()
  idUser: number;

  @IsNumber()
  typeCompany: number;
}
