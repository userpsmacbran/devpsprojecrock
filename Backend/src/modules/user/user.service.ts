import { HttpException, Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ILike } from "typeorm";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ROLES } from "src/constants";
import { ChangeStateDto } from "./dto/change-state.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findAll(
    options: any,
    paginationOptions: { skip?: number; take?: number }
  ) {
    const { skip, take } = paginationOptions;

    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder.where((qb: SelectQueryBuilder<User>) => {
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "country" || key === "city") {
            qb.andWhere(`user.${key} ILIKE :${key}`, { [key]: `%${value}%` });
          } else if (key === "state_User") {
            qb.andWhere(`user.state_User = :state_User`, { state_User: value });
          } else if (key === "searchTerm") {
            qb.andWhere(`user.name ILIKE :name OR user.email ILIKE :email`, {
              name: `%${value}%`,
              email: `%${value}%`,
            });
          } else {
            qb.andWhere(`user.${key} = :${key}`, { [key]: value });
          }
        }
      });
    });

    if (skip !== undefined) {
      queryBuilder.skip(skip);
    } else {
      queryBuilder.skip(0);
    }

    if (take !== undefined) {
      queryBuilder.take(take);
    } else {
      queryBuilder.take(10);
    }

    queryBuilder.orderBy("user.id", "DESC");
    const total = await queryBuilder.getCount();
    const users = await queryBuilder.getMany();
    return { total, users };
  }

  async changeState(id: number, body: ChangeStateDto) {
    const { state } = body;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    if (state === user.state_User)
      throw new HttpException("USER_ALREADY_IN_THIS_STATE", 400);
    user.state_User = state;
    await this.userRepository.save(user);
    return { message: "Ok", data: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);

    const updatedUser = this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(updatedUser);
  }
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["country", "state", "city"],
    });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);
    return { message: "Ok", data: user };
  }

  async remove(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("USER_NOT_FOUND", 404);

    const idUser = (await user).id;
    await this.userRepository.delete(id);
    return {
      message: "Ok",
      data: `User delete successfully: ${idUser}`,
    };
  }
}
