import { HttpException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ROLES } from "src/constants";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  findAll(type: number) {
    if (type === ROLES.EMPRESA) {
      console.log("Usuario tipo 23(Companies)");
      return this.userRepository.find({ where: { type } });
    }
    if (type === ROLES.CLIENTE) {
      console.log("Usuario tipo 99(Clients)");
      return this.userRepository.find({ where: { type } });
    }
    if (type === ROLES.ADMIN) {
      console.log("Usuario tipo 18(Admins)");
      return this.userRepository.find({ where: { type } });
    }
    if (type === ROLES.SUPERADMIN) {
      console.log("Usuario tipo 19(SuperAdmins)");
      return this.userRepository.find({ where: { type } });
    }
    if (type) {
      return new HttpException("INVALID QUERY = TYPE", 400);
    }

    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
