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
    queryBuilder.orderBy("user.id", "ASC"); // Ordenar por nombre de forma predeterminada
    // Contar el número total de usuarios sin paginación
    const total = await queryBuilder.getCount();

    // Obtener los usuarios paginados
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
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
