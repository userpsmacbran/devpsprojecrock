import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtAuthService: JwtService
  ) {}

  async register(userObjetRegister: RegisterAuthDto) {
    const { r_pass_word } = userObjetRegister;
    const plaintoHash = await hash(r_pass_word, 10);

    userObjetRegister = { ...userObjetRegister, r_pass_word: plaintoHash };

    return this.userRepository.save(userObjetRegister);
  }

  async login(userObjetLogin: LoginAuthDto) {
    const { r_email, r_pass_word } = userObjetLogin;

    const findUser = await this.userRepository.findOne({ where: { r_email } });
    console.log(findUser);
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPassword = await compare(r_pass_word, findUser.r_pass_word);

    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { id: findUser.r_id, name: findUser.r_name };

    const token = this.jwtAuthService.sign(payload);

    const data = {
      user: findUser,
      token
    };

    return data;
  }
}
