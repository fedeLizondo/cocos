import MarketDataModel from 'Models/marketdata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { date } from 'zod';

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
    date!: Date;
}


export function toMarketDataModel(model: MarketData): MarketDataModel {
    return {
        id: model.id,
        instrumentId: model.instrumentid,
        high: model.high,
        low: model.low,
        open: model.open,
        close: model.close,
        previousClose: model.previousclose,
        date: model.date
    }
}
