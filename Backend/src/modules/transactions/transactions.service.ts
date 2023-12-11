import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transactions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const {
      id,
      idUser,
      amount,
      type
    } = createTransactionDto
    
    const transaction = await this.transactionsRepository.save({
      r_id: id,
      r_id_user: idUser,
      r_amount: amount,
      r_type_T: type
    })

    return {
      id: transaction.r_id,
      idUser: transaction.r_id_User,
      amount: transaction.r_amount,
      type: transaction.r_type_T
    }
  } 

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
