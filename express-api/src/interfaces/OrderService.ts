import {Order} from "../entities/order";

export default interface OrderService {
    getAll(): typeof Order[]
    getAllForUserId(userId:number): typeof Order[]
    saveOrder(order:typeof Order): typeof Order
}