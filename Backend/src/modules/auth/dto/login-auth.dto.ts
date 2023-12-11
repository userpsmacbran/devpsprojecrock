import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;
}
