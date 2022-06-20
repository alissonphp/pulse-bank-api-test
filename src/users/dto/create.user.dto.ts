import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({required: true})
    username: string

    @ApiProperty({required: true})
    email: string;

    @ApiProperty({required: true})
    password: string;

    @ApiProperty({required: true})
    fullname: string;
}