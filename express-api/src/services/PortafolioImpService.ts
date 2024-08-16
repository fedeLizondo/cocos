
import PortafolioModel from "Models/portafolio";
import OrderImpService from "./OrderImpService";
import OrderImpClient from "../clients/OrderImpClient";
import PortafolioService from "../interfaces/PortafolioService";
import OrderService from "../interfaces/OrderService";

export default class PortafolioImpService implements PortafolioService {
    orderService: OrderService;
    constructor() {
        this.orderService = new OrderImpService(new OrderImpClient());
    }

    async getAll(): Promise<PortafolioModel> {
        try {
            const orderService = new OrderImpService(new OrderImpClient());
            
            const activos = await orderService.getAll()
            console.log("en los activos",activos);
            const model = {
                total: 1000,
                disponible: 500,
                activos: activos
            };
            return model;
        } catch (ex) {
            console.log("en el catch",ex);
            return {
                total: 0,
                disponible: 0,
                activos: []
            };
        }


    }

}