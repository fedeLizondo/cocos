import OrderModel from '../../Models/order';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    instrumentid!: number;

    @Column({ nullable: true })
    userid!: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    size!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column({ nullable: true })
    type!: "MARKET" | "LIMIT";

    @Column({ nullable: true })
    side!: "BUY" | "SELL" | "CASH_IN" | "CASH_OUT";

    @Column({ nullable: true })
    status!: "NEW" | "FILLED" | "REJECTED" | "CANCELLED";

    @Column({ nullable: true })
    datetime!: Date;
}

export function toOrderModel(order: Order): OrderModel {
    return {
        datetime: order.datetime,
        size: order.size,
        type: order.type,
        side: order.side,
        instrumentId: order.instrumentid,
        userId: order.userid,
        price: order.price,
        id: order.id,
        status: order.status
    }
}