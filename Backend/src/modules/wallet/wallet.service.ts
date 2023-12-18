import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Wallet } from "src/entities/wallet.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CryptoService } from "../crypto/crypto.service";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService
  ) {}

  async createWalletForUser(user_id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          r_id: user_id,
        },
      });
      if (!user) {
        throw new HttpException("USER_NOT_FOUND", 400);
      }

      const initialAmount = 20;
      const encryptedAmount = this.cryptoService.encrypt(
        initialAmount.toString()
      );
      const wallet = await this.walletRepository.create({
        r_amount: encryptedAmount,
        r_last_Update: new Date(),
        user: user,
      });

      return await this.walletRepository.save(wallet);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async getDecryptedAmount(walletId: any): Promise<string> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: {
          r_id: walletId,
        },
      });

      if (!wallet) {
        throw new HttpException("WALLET_NOT_FOUND", 400);
      }

      const decryptedAmount = this.cryptoService.decrypt(wallet.r_amount);
      return decryptedAmount;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
