import { IsOptional, IsString } from "class-validator";

export class EditScreenDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  active: boolean;
}
