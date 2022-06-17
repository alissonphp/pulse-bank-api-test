import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MovementType } from '../enums/movement.type';
import { Account } from './account.entity';


@Entity()
export class Movement {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @ManyToOne(() => Account, (account) => account.movements)
    account: Account

    @Column({type: 'enum', enum: MovementType, default: MovementType.TRANSFER})
    type: MovementType

    @Column({type: 'decimal', default: 0})
    total: number;
}