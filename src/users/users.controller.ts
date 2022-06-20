import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create.user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiBody({type: CreateUserDTO})
    @ApiResponse({status: 201, description: 'new user created'})
    @ApiResponse({status: 500, description: 'internal server error'})
    @Post()
    async store(@Body() body: CreateUserDTO) {
        return this.usersService.store(body);
    }
}
