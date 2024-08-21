import express from 'express'
import OrderService from '../interfaces/OrderService';
import OrderImpClient from '../clients/OrderImpClient';
import OrderImpService from '../services/OrderImpService';
import { errorHandler, notFound } from '../middlewares';
import { Order } from '../clients/request/OrderRequest';
import { MarketDataImpService } from '../services/MarketDataImpService';
import { MarketDataImpClient } from '../clients/MarketDataImpClient';

const router = express.Router();

const orderService: OrderService = new OrderImpService(new OrderImpClient(), new MarketDataImpService(new MarketDataImpClient()));

router.get<{ id: number }, {}>('/:id', async (req, res, next) => {
    try {

        const id = req.params.id as number;
        if (!!id) {
            return res.json(await orderService.getAllForUserId(id))
        }
        next(notFound)
    } catch (error) {
        next(error);
    }
});

router.post<{}, {}>('/', async (req, res, next) => {

    const parsed = Order.safeParse(req.body);
    if (parsed.success) {
        if (parsed.data.type == "LIMIT" && !parsed.data.price) {
            errorHandler({
                name: "Limit order must have price",
                message: "LIMIT order must have price"
            }, req, res, next)
        }

        return res.json(await orderService.saveOrder(parsed.data))
    } else {
        errorHandler(parsed.error, req, res, next)
    }
});


router.delete<{ id: number }, {}>('/:id', async (req, res, next) => {
    try {

        const id = req.params.id as number;
        if (!!id) {
            const cancellOrder = await orderService.cancellOrder(id);
            if (cancellOrder != null) {
                return res.json(cancellOrder)
            }
        }
        notFound(null, res, next)
    } catch (error) {
        next(error);
    }
});


export default router;