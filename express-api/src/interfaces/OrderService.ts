import OrderRequest from 'clients/request/OrderRequest';
import OrderModel from 'Models/order';

export default interface OrderService {
  getAll(): Promise<OrderModel[]>
  getAllForUserId(userId:number): Promise<OrderModel[]>
  saveOrder(order:OrderRequest): Promise<OrderModel>
}