import OrderImpClient from "../clients/OrderImpClient"
import MarketDataService from "interfaces/MarketDataService";
import OrderService from "interfaces/OrderService";
import PortafolioService from "interfaces/PortafolioService";
import PortafolioModel, { ActivoModel } from "Models/portafolio";
import { MarketDataImpService } from "./MarketDataImpService";
import { MarketDataImpClient } from "../clients/MarketDataImpClient";
import OrderImpService from "./OrderImpService";
import MarketDataClient from "interfaces/MarketDataClient";


export default class PortafolioImpService implements PortafolioService {
    orderService: OrderService;
    marketDataService: MarketDataService;
    constructor() {
        const marketDataClient: MarketDataClient = new MarketDataImpClient();
        this.marketDataService = new MarketDataImpService(marketDataClient)
        this.orderService = new OrderImpService(new OrderImpClient(), this.marketDataService);
    }

    async getAll(userId: number): Promise<PortafolioModel> {
        try {

            const activos = await this.orderService.getAllFilled(userId)
            const totalActivos = activos.reduce((a: number, b: ActivoModel) => a + b.total, 0);
            const disponible = Math.trunc(await this.orderService.getDisponibleForUser(userId) * 100) / 100;

            const model = {
                total: totalActivos + disponible,
                disponible: disponible,
                activos: activos
            };
            return model;
        } catch (ex) {
            return {
                total: 0,
                disponible: 0,
                activos: []
            };
        }


    }

}