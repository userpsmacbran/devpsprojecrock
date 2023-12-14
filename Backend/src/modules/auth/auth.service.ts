import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { NAME_MODEPLAY, ROLES } from 'src/constants';
import { ModeplayService } from '../modeplay/modeplay.service';

import { Logger } from '@nestjs/common';

const logger = new Logger('MyApp');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly modePlayService: ModeplayService,
    private jwtAuthService: JwtService
  ) {}

  async register(userObjetRegister: RegisterAuthDto) {
    try {
      const { password } = userObjetRegister;
      const plaintoHash = await hash(password, 10);

      userObjetRegister = { ...userObjetRegister, password: plaintoHash };

      const user = await this.userRepository.save({
        r_name: userObjetRegister.name,
        r_last_Name: userObjetRegister.lastName,
        r_email: userObjetRegister.email,
        r_pass_word: userObjetRegister.password,
        r_country: userObjetRegister.country,
        r_city: userObjetRegister.city,
        r_adress: userObjetRegister.adress,
        r_type: userObjetRegister.type,
        r_logo: userObjetRegister.logo,
        r_code_Phone: userObjetRegister.codePhone,
        r_phone: userObjetRegister.phone,
        r_birth_Date: userObjetRegister.birthDate
      });

      if (user.r_type === ROLES.EMPRESA) {
        const modePlay = await this.addModePlays(user);
        user.modePlays = modePlay.data;
        const data = await this.userRepository.save(user);
        return {
          message: 'ok',
          data: {
            id: data.r_id,
            name: data.r_name,
            lastName: data.r_last_Name,
            email: data.r_email,
            country: data.r_city,
            adress: data.r_adress,
            type: data.r_type,
            logo: data.r_logo,
            codePhone: data.r_code_Phone,
            phone: data.r_phone,
            birthDate: data.r_birth_Date,
            stateWallet: data.r_state_Wallet,
            stateUser: data.r_state_User,
            modePlays: data.modePlays.map((mode) => {
              return {
                idCompany: mode.r_id_company,
                cost: mode.r_cost,
                title: mode.r_title,
                type: mode.r_type,
                id: mode.r_id
              };
            })
          }
        };
      }

      return {
        message: 'ok',
        data: {
          user
        }
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async login(userObjetLogin: LoginAuthDto) {
    try {
      const { email, password } = userObjetLogin;

      const findUser = await this.userRepository.findOne({
        where: { r_email: email }
      });
      console.log(findUser);
      if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

      const checkPassword = await compare(password, findUser.r_pass_word);

      if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

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
          stateUser: findUser.r_state_User
        },
        token
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
        title: NAME_MODEPLAY.PLATINUM
      });
      const vip = await this.modePlayService.create({
        idCompany: user.r_id,
        title: NAME_MODEPLAY.VIP
      });
      const normal = await this.modePlayService.create({
        idCompany: user.r_id,
        title: NAME_MODEPLAY.NORMAL
      });

      return {
        message: 'ok',
        data: [platinum.data, vip.data, normal.data]
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
