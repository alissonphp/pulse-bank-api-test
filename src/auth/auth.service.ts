import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}
    async validateUser(email: string, pass: string): Promise<Object | null> {
        const user: User = await this.userService.findOne(email);
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { ...result } = user;
            return result;
          }
      

        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, fullname: user.fullname, sub: user.id};
        return {
            access_token:  this.jwtService.sign(payload),
            username: user.username,
            fullname: user.fullname
        }
    }
}
