import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDtoBase } from "./dto/register-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  registerUser(@Body() userObjetRegister: RegisterAuthDtoBase) {
    return this.authService.register(userObjetRegister);
  }

  @Post("login")
  loginUser(@Body() userObjetLogin: LoginAuthDto) {
    return this.authService.login(userObjetLogin);
  }

  @Get("verify-account")
  async verifyAccountUser(
    @Query("id") id: number,
    @Query("code") code: string
  ) {
    return this.authService.verifyAccountUser(id, code);
  }

  @Get("active-account/:id")
  async activeAccountCompany(@Param("id") id: number) {
    return this.authService.activeAccountCompany(id);
  }

  @Get("resend-code/:id")
  async resendCode(@Param("id") id: number) {
    return this.authService.resendCode(id);
  }

 
}
