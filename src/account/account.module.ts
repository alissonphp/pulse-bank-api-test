import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { Movement } from './entities/movement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Movement, User])
  ],
  controllers: [AccountController],
  providers: [AccountService, UsersService]
})
export class AccountModule {}
