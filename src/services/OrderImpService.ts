import OrderRequest, { OrderValidatedRequest } from "clients/request/OrderRequest";
import OrderClient from "interfaces/OrderClient";
import OrderService from "interfaces/OrderService";
import OrderModel from "Models/order";
import { ActivoModel } from 'Models/portafolio';
import { isStatusRejected } from "./OrderValidatorHelper";
import MarketDataService from "interfaces/MarketDataService";

export default class OrderImpService implements OrderService {

    orderClient: OrderClient
    marketDataService: MarketDataService

    constructor(orderClient: OrderClient, marketDataService: MarketDataService) {
        this.orderClient = orderClient;
        this.marketDataService = marketDataService;
    }
    cancellOrder(orderId: number): Promise<OrderModel|null> {
        return this.orderClient.cancellOrder(orderId);
    }

    getDisponibleForUser(userId: number): Promise<number> {
        return this.orderClient.getDisponibleForUser(userId);
    }

    getAllFilled(userId:number): Promise<ActivoModel[]> {
        return this.orderClient.getAllFilled(userId);
    }

    getAll(): Promise<OrderModel[]> {
        return this.orderClient.getAll();
    }
    getAllForUserId(userId: number): Promise<OrderModel[]> {
        return this.orderClient.getAllForUserId(userId);
    }
    async saveOrder(order: OrderRequest): Promise<OrderModel> {

        var status: "NEW" | "FILLED" | "REJECTED" | "CANCELLED" = "NEW";
        var price: number = order.price ?? 0;
        const instrument = (await this.marketDataService.getAllFromInstrument(order.instrumentId))
        if (order.type == "MARKET") {
            status = "FILLED";
            price = instrument?.close ?? 0;
        }

        var activos = await this.getAllFilled(order.userId);
        
        var activo: ActivoModel | undefined = activos.find(activo => activo.instrument_id == order.instrumentId);
        if (order.side == "BUY") {
            activo = {
                instrument_id: order.instrumentId,
                ticker: '',
                name: '',
                quantity: order.size,
                last_price: instrument?.previousClose ?? 0,
                close_price: instrument?.close ?? 0,
                avg_cost_price: 0,
                percentage_performance: 0,
                amount_performace: 0,
                total: 0,
            };
        }

        const disponible = await this.getDisponibleForUser(order.userId);

        if (isStatusRejected(order, disponible, activo)) {
            status = "REJECTED";
        }

        const orderValidateRequest: OrderValidatedRequest = {
            ...order,
            price: price,
            status: status
        };
        return this.orderClient.saverOrder(orderValidateRequest);
    }

}