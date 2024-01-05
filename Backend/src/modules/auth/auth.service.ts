import { HttpException, Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDtoBase } from "./dto/register-auth.dto";
import { hash, compare } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { NAME_MODEPLAY, ROLES, STATES } from "src/constants";
import { ModeplayService } from "../modeplay/modeplay.service";
import { WalletService } from "../wallet/wallet.service";
import { isValidDateFormat } from "../../utils/isValidDateFormat";

import { Logger } from "@nestjs/common";
import { EmailService } from "../email/email.service";
const logger = new Logger("MyApp");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly modePlayService: ModeplayService,
    private readonly walletService: WalletService,
    private jwtAuthService: JwtService,
    private readonly emailService: EmailService
  ) {}

  async register(userObjectRegister: RegisterAuthDtoBase) {
    try {
      const { password, email, type, ruc, birthDate } = userObjectRegister;

      if (type !== ROLES.EMPRESA) {
        if (!isValidDateFormat(birthDate)) {
          return new HttpException("DATE_FORMAT_IS_INVALID", 400);
        }
      }
      if (!email) return new HttpException("EMAIL_IS_REQUIRED", 400);
      if (!password) return new HttpException("PASSWORD_IS_REQUIRED", 400);

      const plaintoHash = await hash(password, 10);
      userObjectRegister = { ...userObjectRegister, password: plaintoHash };
      const userFound = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      if (userFound) throw new HttpException("USER_EXIST", 400);
      let user: User;

      if (type === ROLES.EMPRESA && !ruc) {
        throw new HttpException("RUC_REQUIRED_FOR_COMPANY", 400);
      }

      if (type === ROLES.EMPRESA || type === ROLES.CLIENTE) {
        let userPayload: any = {
          name: userObjectRegister.name,
          email: userObjectRegister.email,
          pass_word: plaintoHash,
          country: userObjectRegister.country,
          state: userObjectRegister.state,
          city: userObjectRegister.city,
          adress: userObjectRegister.adress,
          type: type,
          logo: userObjectRegister.logo,
          code_Phone: userObjectRegister.codePhone,
          phone: userObjectRegister.phone,
          postalCode: userObjectRegister.postalCode,
        };

        if (type === ROLES.EMPRESA) {
          userPayload.ruc = userObjectRegister.ruc;
        } else {
          userPayload.last_Name = userObjectRegister.lastName;
          userPayload.birth_Date = userObjectRegister.birthDate;
        }

        user = await this.userRepository.save(userPayload);

        const wallet = await this.walletService.createWalletForUser(user.id);
        user.wallet = wallet;
        await this.userRepository.save(user);
      }

      if (
        type === ROLES.SUPERADMIN ||
        type === ROLES.ADMIN ||
        type === ROLES.EMPLEADOS
      ) {
        user = await this.userRepository.save({
          name: userObjectRegister.name,
          last_Name: userObjectRegister.lastName,
          email: userObjectRegister.email,
          pass_word: plaintoHash,
          country: userObjectRegister.country,
          city: userObjectRegister.city,
          adress: userObjectRegister.adress,
          type: type,
          logo: userObjectRegister.logo,
          code_Phone: userObjectRegister.codePhone,
          phone: userObjectRegister.phone,
          birth_Date: userObjectRegister.birthDate,
        });
      }

      if (type === ROLES.CLIENTE) {
        const verificationCode = this.generateVerificationCode();
        await this.emailService.sendEmail(
          email,
          "Verificacion de Cuenta",
          `<div><h1>Tu codigo de verificacion para tu cuenta es: ${verificationCode} </h1></div>`
        );

        user.verificationCode = verificationCode;
        await this.userRepository.save(user);
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

  private generateVerificationCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async login(userObjetLogin: LoginAuthDto) {
    try {
      const { email, password } = userObjetLogin;

      const findUser = await this.userRepository.findOne({
        where: { email },
      });
      if (!findUser) throw new HttpException("USER_NOT_FOUND", 404);

      //Validacion para que no deje loguear si el estado de cuenta no es activo = 1.
      if (
        findUser.type === ROLES.EMPRESA ||
        findUser.type === ROLES.CLIENTE ||
        findUser.type === ROLES.EMPLEADOS
      ) {
        if (findUser.state_User !== STATES.ACTIVO) {
          throw new HttpException("USER_IS_NOT_ACTIVE", 400);
        }
      }

      const checkPassword = await compare(password, findUser.pass_word);
      if (!checkPassword) throw new HttpException("PASSWORD_INCORRECT", 403);

      const payload = { id: findUser.id, name: findUser.name };
      //@author: alejandor morales (Cambie la expiracion del token)
      const token = this.jwtAuthService.sign(payload, { expiresIn: "1h" }); // Cambiado a 1 hora
      const tokenExpiration = new Date(
        new Date().getTime() + 1 * 60 * 60 * 1000
      ); // Cambiado a 1 hora

      const data = {
        user: {
          id: findUser.id,
          name: findUser.name,
          lastName: findUser.last_Name,
          email: findUser.email,
          country: findUser.city,
          adress: findUser.adress,
          type: findUser.type,
          logo: findUser.logo,
          codePhone: findUser.code_Phone,
          phone: findUser.phone,
          birthDate: findUser.birth_Date,
          stateWallet: findUser.state_Wallet,
          stateUser: findUser.state_User,
        },
        token,
        tokenExpiration,
      };

      return data;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async verifyAccountUser(id: number, code: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) return new HttpException("USER_NOT_FOUND", 404);

      if (user.type !== ROLES.CLIENTE) {
        return new HttpException("USER_IS_NOT_A_CLIENT_TYPE", 400);
      }
      if (user.state_User === STATES.ACTIVO) {
        return new HttpException("USER_ALREADY_VERIFIED", 400);
      }
      if (user.verificationCode !== code)
        return new HttpException("CODE_INCORRECT", 400);

      if (user && user.verificationCode === code) {
        await this.userRepository.update(user.id, {
          state_User: STATES.ACTIVO,
        });
        return { message: "ok", data: "Email verification successfully" };
      }
    } catch (error) {
      return new HttpException("SERVER_ERROR", 500);
    }
  }

  async resendCode(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return new HttpException("USER_NOT_FOUND", 404);
    if (user.type !== ROLES.CLIENTE)
      return new HttpException("USER_IS_NOT_A_CLIENT_TYPE", 400);
    if (user.state_User === STATES.ACTIVO)
      return new HttpException("USER_ALREADY_VERIFIED", 400);

    await this.emailService.sendEmail(
      user.email,
      "Verificacion de Cuenta - Reenvio de codigo",
      `<div><h1>Tu codigo de verificacion para tu cuenta es: ${user.verificationCode} </h1></div>`
    );

    return {
      message: "ok",
      data: "Code resend successfully",
    };
  }
  async activeAccountCompany(id: number) {
    const company = await this.userRepository.findOne({ where: { id } });
    if (!company) return new HttpException("COMPANY_NOT_FOUND", 404);
    if (company.type !== ROLES.EMPRESA)
      return new HttpException("USER_IS_NOT_A_COMPANY_TYPE", 400);
    if (company.state_User === STATES.ACTIVO)
      return new HttpException("COMPANY_ALREADY_VERIFIED", 400);

    company.state_User = STATES.ACTIVO;
    await this.userRepository.save(company);

    return {
      message: "ok",
      data: "Company account successfully activated",
    };
  }
}
