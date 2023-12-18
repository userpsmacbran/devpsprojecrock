import { HttpException, Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDtoBase } from "./dto/register-auth.dto";
import { hash, compare } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { NAME_MODEPLAY, ROLES } from "src/constants";
import { ModeplayService } from "../modeplay/modeplay.service";
import { WalletService } from "../wallet/wallet.service";
import { isValidDateFormat } from "../../utils/isValidDateFormat";

import { Logger } from "@nestjs/common";
const logger = new Logger("MyApp");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly modePlayService: ModeplayService,
    private readonly walletService: WalletService,
    private jwtAuthService: JwtService
  ) {}

  async register(userObjectRegister: RegisterAuthDtoBase) {
    try {
      const { password, email, type, ruc, birthDate } = userObjectRegister;

      if (!isValidDateFormat(birthDate))
        return new HttpException("DATE_FORMAT_IS_INVALID", 400);
      if (!email) return new HttpException("EMAIL_IS_REQUIRED", 400);
      if (!password) return new HttpException("PASSWORD_IS_REQUIRED", 400);

      const plaintoHash = await hash(password, 10);
      userObjectRegister = { ...userObjectRegister, password: plaintoHash };
      const userFound = await this.userRepository.findOne({
        where: {
          r_email: email,
        },
      });
      if (userFound) throw new HttpException("USER_EXIST", 400);
      let user: User;

      if (type === ROLES.EMPRESA && !ruc) {
        throw new HttpException("RUC_REQUIRED_FOR_COMPANY", 400);
      }

      if (type === ROLES.EMPRESA || type === ROLES.CLIENTE) {
        user = await this.userRepository.save({
          r_name: userObjectRegister.name,
          r_last_Name: userObjectRegister.lastName,
          r_email: userObjectRegister.email,
          r_pass_word: plaintoHash,
          r_country: userObjectRegister.country,
          r_city: userObjectRegister.city,
          r_adress: userObjectRegister.adress,
          r_type: type,
          r_logo: userObjectRegister.logo,
          r_code_Phone: userObjectRegister.codePhone,
          r_phone: userObjectRegister.phone,
          r_birth_Date: userObjectRegister.birthDate,
          ...(type === ROLES.EMPRESA && { r_ruc: userObjectRegister.ruc }),
        });

        await this.walletService.createWalletForUser(user.r_id);
        await this.userRepository.save(user);
      }

      if (
        type === ROLES.SUPERADMIN ||
        type === ROLES.ADMIN ||
        type === ROLES.EMPLEADOS
      ) {
        user = await this.userRepository.save({
          r_name: userObjectRegister.name,
          r_last_Name: userObjectRegister.lastName,
          r_email: userObjectRegister.email,
          r_pass_word: plaintoHash,
          r_country: userObjectRegister.country,
          r_city: userObjectRegister.city,
          r_adress: userObjectRegister.adress,
          r_type: type,
          r_logo: userObjectRegister.logo,
          r_code_Phone: userObjectRegister.codePhone,
          r_phone: userObjectRegister.phone,
          r_birth_Date: userObjectRegister.birthDate,
        });
      }

      return {
        message: "ok",
        data: {
          user,
        },
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async login(userObjetLogin: LoginAuthDto) {
    try {
      const { email, password } = userObjetLogin;

      const findUser = await this.userRepository.findOne({
        where: { r_email: email },
      });
      console.log(findUser);
      if (!findUser) throw new HttpException("USER_NOT_FOUND", 404);

      const checkPassword = await compare(password, findUser.r_pass_word);

      if (!checkPassword) throw new HttpException("PASSWORD_INCORRECT", 403);

      const payload = { id: findUser.r_id, name: findUser.r_name };

      const token = this.jwtAuthService.sign(payload);

      const data = {
        user: {
          id: findUser.r_id,
          name: findUser.r_name,
          lastName: findUser.r_last_Name,
          email: findUser.r_email,
          country: findUser.r_city,
          adress: findUser.r_adress,
          type: findUser.r_type,
          logo: findUser.r_logo,
          codePhone: findUser.r_code_Phone,
          phone: findUser.r_phone,
          birthDate: findUser.r_birth_Date,
          stateWallet: findUser.r_state_Wallet,
          stateUser: findUser.r_state_User,
        },
        token,
      };

      return data;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async addModePlays(user: any) {
    try {
      const platinum = await this.modePlayService.create({
        idCompany: user.r_id,
        title: NAME_MODEPLAY.PLATINUM,
      });
      const vip = await this.modePlayService.create({
        idCompany: user.r_id,
        title: NAME_MODEPLAY.VIP,
      });
      const normal = await this.modePlayService.create({
        idCompany: user.r_id,
        title: NAME_MODEPLAY.NORMAL,
      });

      return {
        message: "ok",
        data: [platinum.data, vip.data, normal.data],
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
