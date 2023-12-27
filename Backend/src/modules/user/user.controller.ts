import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/jwt.strategy";
import { QueryUserDto } from "./dto/query-user.dto";
import { parse } from "path";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: QueryUserDto) {
    const { type } = query;
    const users = await this.userService.findAll(parseInt(type));
    return { message: "ok", data: users };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
