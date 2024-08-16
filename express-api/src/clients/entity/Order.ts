import OrderModel, { StringToSideType, StringToStatusType, StringToTypeType } from './../../Models/order';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    instrumentid!: number;

    @Column({ nullable: true })
    userid!: number;

    @Column({ nullable: true })
    size!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column({ nullable: true })
    type!: string;

    @Column({ nullable: true })
    side!: string;

    @Column({ nullable: true })
    status!: string;

    @Column({ nullable: true })
    datetime!: string;
}

export function toOrderModel(order: Order): OrderModel {
    return {
        datetime: order.datetime,
        size: order.size,
        type: StringToTypeType[order.type],
        side: StringToSideType[order.side],
        instrumentId: order.instrumentid,
        userId: order.userid,
        id: order.id,
        status: StringToStatusType[order.status]
    }
}