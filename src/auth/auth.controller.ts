import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiBody({type: LoginDTO})
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Ok, your web token is valid!'})
    @ApiResponse({ status: 401, description: 'Oops! we cannot validate your token :/'})
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Request() req) {
        return req.user
    }
}
