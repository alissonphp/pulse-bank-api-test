import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDTO {
    @ApiProperty({ type: 'number'})
    balance: number;

    @ApiProperty({description: 'set your birth date - only numbers'})
    number: string
}