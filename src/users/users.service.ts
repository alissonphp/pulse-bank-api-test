import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create.user.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOneOrFail({
            where: {
                email
            },
            select: ['id', 'username', 'fullname', 'password']
        })
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOneOrFail({
            where: {
                username
            }
        })
    }

    async store(body: CreateUserDTO): Promise<User> {
        const hash = bcrypt.hashSync(body.password, 12);
        const user = new User();
        user.username = body.username;
        user.email = body.email;
        user.password = hash;
        user.fullname = body.fullname;
        return this.userRepository.save(user);
    }



}
