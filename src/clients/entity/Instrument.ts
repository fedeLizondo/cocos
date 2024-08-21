import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as instrumentDto from 'Models/instrument';

@Entity("instruments")
export class Instrument {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  ticker!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  type!: string;
}


export function toInstrumentModel(instrument: Instrument): instrumentDto.default {
  return {
    id: instrument.id,
    name: instrument.name,
    ticker: instrument.ticker,
    type: instrument.type
  };
}