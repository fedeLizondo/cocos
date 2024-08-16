import OrderRequest from "clients/request/OrderRequest";
import OrderModel from "Models/order";

export default interface OrderClient {
    getAll(): Promise<OrderModel[]>
    getAllForUserId(userId:number): Promise<OrderModel[]>
    saverOrder(order:OrderRequest): Promise<OrderModel>
}