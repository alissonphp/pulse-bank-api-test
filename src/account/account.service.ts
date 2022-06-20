import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, response, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAccountDTO } from './dto/create.account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        private usersService: UsersService
    ) { }

    async list(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async store(data: CreateAccountDTO, user: User): Promise<Response> {

        const acc = new Account();
        acc.agency = '0001'
        acc.user = await this.usersService.findOneByUsername(user.username)
        acc.number = data.number
        acc.balance = data.balance
        acc.movements = []

        await this.accountRepository.save(acc)

        return response.status(201)

    }
}
