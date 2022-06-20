import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Movement } from './movement.entity';

@Entity()
export class Account {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @ApiProperty()
    @Column({name: 'agency'})
    agency: string

    @ApiProperty()
    @Column({name: 'number'})
    number: string

    @ApiProperty()
    @Column({name: 'balance', type: 'decimal'})
    balance: number;

    @ApiProperty({ type: [Movement]})
    @OneToMany(() => Movement, (movement) => movement.account, {cascade: true})
    movements: Movement[]

    @OneToOne(() => User)
    @JoinColumn()
    user: User

}