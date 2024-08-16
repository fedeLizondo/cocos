import { Order } from './../clients/request/OrderRequest';
import OrderRequest from "clients/request/OrderRequest";
import OrderClient from "interfaces/OrderClient";
import OrderService from "interfaces/OrderService";
import OrderModel from "Models/order";

export default class OrderImpService implements OrderService {

    orderClient:OrderClient
    constructor(orderClient:OrderClient){
        this.orderClient = orderClient;
    }

    getAll(): Promise<OrderModel[]> {
        return this.orderClient.getAll();
    }
    getAllForUserId(userId: number): Promise<OrderModel[]> {
        throw new Error("Method not implemented.");
    }
    saveOrder(order: OrderRequest): Promise<OrderModel> {
        throw new Error("Method not implemented.");
    }
    
}