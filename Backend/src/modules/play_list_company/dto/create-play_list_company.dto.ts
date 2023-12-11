import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString
} from 'class-validator';
import { MODEPLAY } from 'src/constants';

export class CreatePlayListCompanyDto {
  @IsArray()
  idVideo: string[];

  @IsNumber()
  idCompany: number;

  @IsNumber()
  idUser: number;

  @IsEnum(MODEPLAY)
  order: MODEPLAY;

  @IsString()
  duration: string;

  @IsNumber()
  state: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  thumbnailsDefault: string;

  @IsString()
  thumbnailsMedium: string;

  @IsString()
  thumbnailsHigh: string;

  @IsBoolean()
  fullScreen: boolean;
}
