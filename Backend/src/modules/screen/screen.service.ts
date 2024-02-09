import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Screen } from "src/entities/screen.entity";
import { CreateScreenDto } from "./dto/create-screen.dto";
import { User } from "src/entities/user.entity";
import { ROLES } from "src/constants";
import { EditScreenDto } from "./dto/edit-screen.dto";

@Injectable()
export class ScreenService {
  constructor(
    @InjectRepository(Screen)
    private readonly screenRepository: Repository<Screen>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll() {
    const screens = await this.screenRepository.find();
    if (!screens) {
      throw new HttpException("Not found", 404);
    }
    return screens;
  }

  async getAllScreensByCompany(companyId: number): Promise<Screen[]> {
    return this.screenRepository.find({
      where: { company: { id: companyId } },
    });
  }

  async getScreenById(id: number): Promise<Screen> {
    console.log("id", id);
    const screen = await this.screenRepository.findOne({ where: { id } });
    if (!screen) {
      throw new HttpException("SCREEN_NOT_FOUND", 404);
    }
    return screen;
  }

  async createScreen(objectCreate: CreateScreenDto) {
    const { idCompany, name, code } = objectCreate;

    const company = await this.userRepository.findOne({
      where: { id: idCompany },
    });

    if (!company) {
      throw new HttpException("COMPANY_NOT_FOUND", 404);
    }
    if (company.type !== ROLES.EMPRESA) {
      throw new HttpException("USER_NOT_COMPANY", 403);
    }

    // if (!company.activeMembership) {
    //   throw new HttpException("NO_MEMBERSHIP_ACTIVE", 403);
    // }

    // Se debe realizar la validacion de que, si la empresa tiene un limite de pantallas y
    // ya llego a ese limite, no se le permita crear mas pantallas

    const screen = new Screen();
    screen.name = name;
    screen.code = code;
    screen.company = company;
    screen.active = true;
    await this.screenRepository.save(screen);

    return screen;
  }

  async editScreen(id: number, editScreenDto: EditScreenDto) {
    const screen = await this.screenRepository.findOne({ where: { id } });

    if (!screen) {
      throw new HttpException("SCREEN_NOT_FOUND", 404);
    }

    if (editScreenDto.name !== undefined) {
      screen.name = editScreenDto.name;
    }

    if (editScreenDto.code !== undefined) {
      screen.code = editScreenDto.code;
    }

    if (editScreenDto.active !== undefined) {
      screen.active = editScreenDto.active;
    }

    // Guardar los cambios en la base de datos
    await this.screenRepository.save(screen);

    return screen;
  }
}
