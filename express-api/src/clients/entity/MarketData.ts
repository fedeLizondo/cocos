import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("marketdata")
export class MarketData {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    instrumentid!: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    high!: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    low!: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    open!: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    close!: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    previousclose!: number;

    @Column('date', { nullable: true })
    date!: string;
}
