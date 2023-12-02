import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  r_name: string;

  @IsString()
  r_last_Name: string;

  @IsString()
  r_email: string;

  @IsString()
  r_pass_word: string;

  @IsString()
  r_country: string;

  @IsString()
  r_city: string;

  @IsString()
  r_adress: string;

  @IsNumber()
  r_type: number;

  @IsString()
  r_logo: string;

  @IsString()
  r_code_Phone: string;

  @IsString()
  r_phone: string;

  @IsDate()
  r_birth_Date: Date;

  // @IsNumber()
  // r_state_Wallet: number;

  // @IsNumber()
  // r_state_User: number;

  // r_tocken: string;
}
