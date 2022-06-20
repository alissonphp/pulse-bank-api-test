import { Account } from 'src/account/entities/account.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: 'varchar', length: 60 })
  username: string;

  @Column({ type: 'varchar', length: 120 })
  fullname: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, select: false })
  password: string;


}
