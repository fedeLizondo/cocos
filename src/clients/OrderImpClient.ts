import OrderClient from "interfaces/OrderClient";
import { AppDataSource } from "./db";
import { Order, toOrderModel } from "./entity/Order";
import OrderModel from "../Models/order";
import OrderRequest, { OrderValidatedRequest } from "./request/OrderRequest";
import { Equal, Like } from "typeorm";
import { MarketData } from "./entity/MarketData";
import { Instrument } from "./entity/Instrument";
import { ActivoModel } from "Models/portafolio";


const OrderRepository = AppDataSource.getRepository(Order);

export default class OrderImpClient implements OrderClient {

    async getAll(): Promise<OrderModel[]> {
        const order = OrderRepository.find();

        try {
            const result = await order;
            return result.map(order => toOrderModel(order));
        } catch (_) {
            return [];
        }
    }
    async getAllForUserId(userId: number): Promise<OrderModel[]> {
        const orders = OrderRepository.find({
            where: [
                { userid: Equal(userId) }
            ]
        });

        try {
            const result = await orders;
            return result.map(order => toOrderModel(order));
        } catch (_) {
            return [];
        }
    }

    async getAllFilled(userId:number): Promise<ActivoModel[]> {
        const results = await OrderRepository
            .createQueryBuilder('orders')
            .select([
                'orders.instrumentid AS instrument_id',
                'instrument.ticker as ticker',
                'instrument.name as name',
                "COALESCE(SUM(CASE WHEN orders.side LIKE 'BUY' THEN orders.size ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN orders.side LIKE 'SELL' THEN orders.size ELSE 0 END), 0) AS quantity",
                'marketdata.close AS close_price',
                'marketdata.previousclose AS last_price',
                'AVG(CASE WHEN orders.side LIKE \'BUY\' THEN orders.price ELSE 0 END) AS avg_cost_price'
            ])
            .innerJoin(
                MarketData,
                'marketdata',
                'marketdata.instrumentid = orders.instrumentid AND marketdata.date = (' +
                OrderRepository.createQueryBuilder()
                    .select('MAX(md2.date)')
                    .from(MarketData, 'md2')
                    .where('md2.instrumentid = marketdata.instrumentid')
                    .getQuery() + ')'
            )
            .innerJoin(Instrument, 'instrument', 'orders.instrumentid = instrument.id')
            .where('orders.status IN (:...statuses)', { statuses: ['FILLED'] })
            .andWhere('orders.userid = :userId',{userId})
            .groupBy('orders.instrumentid')
            .addGroupBy('instrument.ticker')
            .addGroupBy('instrument.name')
            .addGroupBy('marketdata.close')
            .addGroupBy('marketdata.previousclose')
            .getRawMany();

        return results.map(result => ({
            instrument_id: result.instrument_id,
            ticker: result.ticker,
            name: result.name,
            quantity: parseFloat(result.quantity),
            last_price: parseFloat(result.last_price),
            close_price: parseFloat(result.close_price),
            avg_cost_price: Math.trunc(parseFloat(result.avg_cost_price) * 100) / 100,
            percentage_performance: this.calculatePercentage(result),
            amount_performace: this.calculateAmountTotal(result),
            total: this.calculateTotal(result)
        }))

        // return results

    }

    calculateOriginalTotal(result: any): number {
        return Math.trunc(parseFloat(result.quantity) * parseFloat(result.avg_cost_price) * 100) / 100;
    }

    calculateTotal(result: any): number {
        return Math.trunc(parseFloat(result.quantity) * parseFloat(result.close_price) * 100) / 100;
    }

    calculateAmountTotal(result: any): number {
        return Math.trunc(parseFloat(result.quantity) * (parseFloat(result.close_price) - parseFloat(result.avg_cost_price)) * 100) / 100
    }

    calculatePercentage(result: any) {
        return Math.trunc((this.calculateAmountTotal(result) / this.calculateOriginalTotal(result)) * 10000) / 100
    }


    async getDisponibleForUser(userid: number): Promise<any> {
        try {
            const result = await OrderRepository
                .createQueryBuilder('orders')
                .select(
                    "COALESCE(SUM(CASE WHEN orders.side IN ('SELL', 'CASH_IN') THEN orders.size * orders.price ELSE 0 END), 0) - " +
                    "COALESCE(SUM(CASE WHEN orders.side IN ('BUY', 'CASH_OUT') THEN orders.size * orders.price ELSE 0 END), 0) as disponible")
                .where('orders.status NOT IN (:...statuses)', { statuses: ['REJECTED', 'CANCELLED'] })
                .getRawOne();

            return result?.disponible ?? 0
        } catch (error) {
            return 0;
        }
    }

    async saverOrder(order: OrderValidatedRequest): Promise<OrderModel> {
        const orderEntity: Order = new Order();
        orderEntity.instrumentid = order.instrumentId;
        orderEntity.price = order.price;
        orderEntity.side = order.side;
        orderEntity.size = order.size;
        orderEntity.status = order.status;
        orderEntity.type = order.type;
        orderEntity.userid = order.userId;
        orderEntity.datetime = new Date();

        const result = await OrderRepository.save(orderEntity)
        return toOrderModel(result);
    }

    async cancellOrder(orderId: number): Promise<OrderModel | null> {
        const result = await OrderRepository.findOne({
            where: [{ id: Equal(orderId), status: Like("NEW") }
            ]
        });
        if (result == null) {
            return null;
        }

        const updated = await OrderRepository.update(orderId, { status: "CANCELLED" })
        result.status = "CANCELLED";
        return toOrderModel(result);
    }
}