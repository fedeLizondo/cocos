import OrderClient from "interfaces/OrderClient";
import { AppDataSource } from "./db";
import { Order, toOrderModel } from "./entity/Order";
import OrderModel from "Models/order";
import OrderRequest from "./request/OrderRequest";
import { Equal } from "typeorm";


const OrderRepository = AppDataSource.getRepository(Order);

export default class OrderImpClient implements OrderClient{
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
    saverOrder(order: OrderRequest): Promise<OrderModel> {
        throw new Error("Method not implemented.");
    }
    
}