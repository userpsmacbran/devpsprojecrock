import { HttpException, Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ILike } from "typeorm";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ROLES } from "src/constants";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findAll(options: {
    type?: number;
    country?: string;
    city?: string;
    state_User?: number;
  }): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .where((qb: SelectQueryBuilder<User>) => {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined) {
            if (key === "country" || key === "city") {
              qb.andWhere(`user.${key} ILIKE :${key}`, { [key]: `%${value}%` });
            } else if (key === "state_User") {
              qb.andWhere(`user.state_User = :state_User`, {
                state_User: value,
              });
            } else {
              qb.andWhere(`user.${key} = :${key}`, { [key]: value });
            }
          }
        });
      })
      .getMany();
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
