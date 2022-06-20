import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Movement } from './movement.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @Column({name: 'agency'})
    agency: string

    @Column({name: 'number'})
    number: string

    @Column({name: 'balance', type: 'decimal'})
    balance: number;

    @OneToMany(() => Movement, (movement) => movement.account, {cascade: true})
    movements: Movement[]

    @OneToOne(() => User)
    @JoinColumn()
    user: User

}