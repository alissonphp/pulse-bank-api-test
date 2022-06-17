import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movement } from './movement.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @Column({name: 'owner', type: 'int'})
    owner: number;

    @Column({name: 'balance', type: 'decimal'})
    balance: number;

    @OneToMany(() => Movement, (movement) => movement.account)
    movements: Movement[]
}