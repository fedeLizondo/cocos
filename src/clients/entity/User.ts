import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ nullable: true })
    email!: string;

  @Column({ nullable: true })
    accountNumber!: number;
}