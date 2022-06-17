import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {

    @ApiProperty({ required: true })
    username: string;

    @ApiProperty({ required: true })
    password: string;

}