import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create.account.dto';

@Controller('account')
@ApiTags('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBody({type: CreateAccountDTO})
    @ApiBearerAuth()
    @ApiResponse({status: 201, description: 'account created'})
    @ApiResponse({ status: 401, description: 'jwt token invalid to this payload'})
    @Post()
    async store(@Body() body: CreateAccountDTO, @Request() req) {
        return this.accountService.store(body, req.user);
    }
}
