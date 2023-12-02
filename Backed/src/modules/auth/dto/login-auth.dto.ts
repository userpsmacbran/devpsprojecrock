import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  r_email: string;

  @MinLength(8)
  @IsString()
  r_pass_word: string;
}
