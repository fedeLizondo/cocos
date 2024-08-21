import OrderRequest, { OrderValidatedRequest } from "clients/request/OrderRequest";
import OrderModel from "Models/order";
import { ActivoModel } from "Models/portafolio";

export default interface OrderClient {
    getAll(): Promise<OrderModel[]>
    getAllForUserId(userId: number): Promise<OrderModel[]>
    saverOrder(order: OrderValidatedRequest): Promise<OrderModel>
    getAllFilled(userId:number): Promise<ActivoModel[]>
    getDisponibleForUser(userId: number): Promise<number>,
    cancellOrder(orderId: number): Promise<OrderModel|null>
}