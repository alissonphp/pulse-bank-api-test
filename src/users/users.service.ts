import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'john',
            password: '123456'
        },
        {
            userId: 2,
            username: 'mark',
            password: '654321'
        }
    ]
}
