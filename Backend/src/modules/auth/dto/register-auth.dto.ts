import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { ROLES, STATES } from 'src/constants';
import { MinAge } from 'src/utils/birthDate.validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  adress: string;

  @IsEnum(ROLES)
  type: ROLES;

  @IsString()
  logo: string;

  @IsString()
  codePhone: string;

  @IsString()
  phone: string;

  @IsDateString()
  @MinAge(18, { message: 'La edad minima es 18 años.' })
  birthDate: string;

  @IsEnum(STATES)
  @IsOptional()
  stateWallet: STATES;

  @IsEnum(STATES)
  @IsOptional()
  stateUser: STATES;
}
