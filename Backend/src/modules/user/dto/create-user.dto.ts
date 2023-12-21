import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  last_Name: string;

  @IsString()
  email: string;

  @IsString()
  pass_word: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  adress: string;

  @IsNumber()
  type: number;

  @IsString()
  logo: string;

  @IsString()
  code_Phone: string;

  @IsString()
  phone: string;

  @IsDate()
  birth_Date: Date;

  // @IsNumber()
  // r_state_Wallet: number;

  // @IsNumber()
  // r_state_User: number;

  // r_tocken: string;
}
