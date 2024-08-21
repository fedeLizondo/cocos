import OrderRequest from "clients/request/OrderRequest";
import { ActivoModel } from 'Models/portafolio';


export function isStatusRejected(order: OrderRequest,
    disponible: number,
    activo: ActivoModel | undefined): boolean {


    if (order.side === "CASH_IN") {
        return false;
    }

    if (order.side === "CASH_OUT") {
        return order.size > disponible;
    }


    if (order.side == "SELL") {
        return !activo || order.size > activo.quantity
    }

    if (order.side == "BUY") {
        const total = order.size * ((order.type == "MARKET" ? activo?.close_price ?? 0 : order.price) ?? 1)
        return total > disponible;
    }

    return true;
}