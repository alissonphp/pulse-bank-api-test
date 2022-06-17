import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    fullname: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'john',
            fullname: 'John Due',
            password: '123456'
        },
        {
            userId: 2,
            username: 'mark',
            fullname: 'Mark Zukeberg',
            password: '654321'
        },
        {
            userId: 3,
            username: 'master',
            fullname: 'Grand Master',
            password: 'xx11xx'
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
