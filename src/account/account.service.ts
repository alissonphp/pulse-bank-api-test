import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAccountDTO } from './dto/create.account.dto';
import { TransferDTO } from './dto/transfer.dto';
import { Account } from './entities/account.entity';
import { Movement } from './entities/movement.entity';
import { MovementType } from './enums/movement.type';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @InjectRepository(Movement)
        private movementRepository: Repository<Movement>,
        private usersService: UsersService
    ) { }

    async list(): Promise<Account[]> {
        return this.accountRepository.find({ select: ['id', 'agency', 'number'] });
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

    async makeTransfer(data: TransferDTO, user: User, res: Response): Promise<Response> {

        const userAcc: User = await this.usersService.findOneByUsername(user.username);
        const fromAcc: Account = await this.accountRepository.findOne({
            where: {
                user: userAcc
            }
        })

        const toAcc: Account = await this.accountRepository.findOne({
            where: {
                agency: data.agency,
                number: data.number
            }
        })

        if (!toAcc) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'target account not found' })
        }

        await this.updateAccountBalance(fromAcc, data.amount, 'out')
        await this.updateAccountBalance(toAcc, data.amount, 'in')

        return res.status(HttpStatus.OK).json({ message: 'transfer was finished with success!' })
    }

    async updateAccountBalance(account: Account, amount: number, action: string): Promise<void> {
        const total = (action === 'in') ? amount : (amount * -1)
        account.balance = parseFloat(String(account.balance)) + total
        await this.accountRepository.save(account)
        await this.storeAccountMovement(account, MovementType.TRANSFER, total, action)
    }

    async storeAccountMovement(account: Account, type: MovementType, amount: number, action: string): Promise<void> {
        const typeDescription = (action === 'in') ? 'received' : 'sended'
        const movement = new Movement()
        movement.account = account
        movement.total = amount
        movement.type = type
        movement.description = `you ${typeDescription} a new ${type} in your account`

        await this.movementRepository.save(movement)
    }

    async statement(user: User, res: Response): Promise<Account | Response> {
        try {
            const currentUser = await this.usersService.findOneByUsername(user.username);
            const account = await this.accountRepository.findOneOrFail({
                where: { user: currentUser }, relations: ['movements']
            })
            return res.status(HttpStatus.OK).json(account);
        } catch (err) {
            console.error(err)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
}
