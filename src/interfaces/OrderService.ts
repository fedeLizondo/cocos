import OrderRequest from 'clients/request/OrderRequest';
import OrderModel from 'Models/order';

export default interface OrderService {
  getAll(): Promise<OrderModel[]>
  getAllForUserId(userId: number): Promise<OrderModel[]>
  getAllFilled(userId:number): Promise<any>
  saveOrder(order: OrderRequest): Promise<OrderModel>
  getDisponibleForUser(userId: number): Promise<number>
  cancellOrder(orderId: number): Promise<OrderModel | null>
}