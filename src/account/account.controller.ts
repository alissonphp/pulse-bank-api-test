import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create.account.dto';
import { TransferDTO } from './dto/transfer.dto';
import { Account } from './entities/account.entity';

@Controller('account')
@ApiTags('accounts')
export class AccountController {
    constructor(private accountService: AccountService) { }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: [Account], description: 'account list' })
    @ApiResponse({ status: 401, description: 'jwt token invalid to this payload' })
    @Get()
    async list() {
        return this.accountService.list();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreateAccountDTO })
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'account created' })
    @ApiResponse({ status: 401, description: 'jwt token invalid to this payload' })
    @Post()
    async store(@Body() body: CreateAccountDTO, @Request() req) {
        return this.accountService.store(body, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: TransferDTO })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'transfer finished' })
    @ApiResponse({ status: 401, description: 'jwt token invalid to this payload' })
    @ApiResponse({ status: 404, description: 'target account not found' })
    @Post('/transfer')
    async transfer(@Body() body: TransferDTO, @Request() req, @Res() res: Response) {
        return this.accountService.makeTransfer(body, req.user, res);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Account, description: 'you account statement' })
    @ApiResponse({ status: 401, description: 'jwt token invalid to this payload' })
    @Get('/statement')
    async statement(@Request() req, @Res() res: Response) {
        return this.accountService.statement(req.user, res);
    }
}
