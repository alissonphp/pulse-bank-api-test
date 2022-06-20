import { ApiProperty } from "@nestjs/swagger";

export class TransferDTO {
    @ApiProperty({required: true})
    agency: string;

    @ApiProperty({required: true})
    number: string;

    @ApiProperty({required: true})
    amount: number;
}