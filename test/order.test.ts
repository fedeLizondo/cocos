import OrderRequest from '../src/clients/request/OrderRequest';
import OrderService from '../src/interfaces/OrderService';
import MarketDataClient from '../src/interfaces/MarketDataClient';
import OrderClient from '../src/interfaces/OrderClient';
import OrderImpService from '../src/services/OrderImpService';
import { MarketDataImpService } from '../src/services/MarketDataImpService';

const OrderClientMock: jest.Mocked<OrderClient> = {
    getAll: jest.fn(),
    getAllForUserId: jest.fn(),
    saverOrder: jest.fn(),
    getAllFilled: jest.fn(),
    getDisponibleForUser: jest.fn(),
    cancellOrder: jest.fn(),
};

const MarketDataClientMock: jest.Mocked<MarketDataClient> = {
    getAll: jest.fn(),
    getAllLatest: jest.fn(),
    getAllFromInstrument: jest.fn(),
};
jest.mock('../src/interfaces/OrderClient', () => OrderClientMock);
jest.mock('../src/interfaces/MarketDataClient', () => MarketDataClientMock);



describe('Order API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get empty array of orders', async () => {
        const orderService: OrderService = new OrderImpService(OrderClientMock, new MarketDataImpService(MarketDataClientMock));

        //const mockSave = jest.fn().mockResolvedValue({ id: 1, ...orderData });
        // getRepository(Order).save = mockSave;
        OrderClientMock.getAllForUserId.mockResolvedValue([]);

        const response = await orderService.getAllForUserId(1);
        //.expect(200, { "pepe": "pepe" }, done););

        expect(response.length).toStrictEqual(0);
        //expect(mockSave).toHaveBeenCalledWith(orderData);
        //expect(response.status).toBe(200);
        //expect(response.body).toEqual(mockOrder);
        expect(OrderClientMock.getAllForUserId).toHaveBeenCalledWith(1);
    });

    it('should get a value', async () => {
        const orderService: OrderService = new OrderImpService(OrderClientMock, new MarketDataImpService(MarketDataClientMock));

        OrderClientMock.getAllForUserId.mockResolvedValue([{
            id: 0,
            instrumentId: 1,
            userId: 1,
            side: 'BUY',
            size: 1,
            price: 10,
            type: 'MARKET',
            status: 'NEW',
            datetime: new Date(),
        }]);

        const response = await orderService.getAllForUserId(1);
        expect(response.length).toStrictEqual(1);
        expect(OrderClientMock.getAllForUserId).toHaveBeenCalledWith(1);
    });


    it('should get a new order', async () => {
        const orderService: OrderService = new OrderImpService(OrderClientMock, new MarketDataImpService(MarketDataClientMock));
        OrderClientMock.getAllForUserId.mockResolvedValue([{
            id: 0,
            instrumentId: 1,
            userId: 1,
            side: 'BUY',
            size: 1,
            price: 10,
            type: 'LIMIT',
            status: 'NEW',
            datetime: new Date(),
        }]);

        OrderClientMock.getAllFilled.mockResolvedValue([{
            instrument_id: 1,
            ticker: 'Test',
            name: 'Un test',
            quantity: 10,
            last_price: 1,
            close_price: 2,
            avg_cost_price: 1.25,
            percentage_performance: 5,
            amount_performace: 5,
            total: 5,
        }]);

        OrderClientMock.getDisponibleForUser.mockResolvedValue(2000);
        OrderClientMock.saverOrder.mockResolvedValue({
            id: 1,
            instrumentId: 1,
            userId: 1,
            side: 'BUY',
            size: 1,
            price: 10,
            type: 'LIMIT',
            status: 'NEW',
            datetime: new Date(),
        });

        const orderRequest: OrderRequest = {
            instrumentId: 1,
            price: 10,
            side: 'BUY', // Usamos el esquema de validación para 'side'
            size: 1,
            type: 'LIMIT', // Ejemplo de otro enum
            userId: 1,
        };

        const response = await orderService.saveOrder(orderRequest);
        expect(OrderClientMock.saverOrder).toHaveBeenCalledWith({
            instrumentId: 1,
            price: 10,
            side: 'BUY',
            size: 1,
            status: 'NEW',
            type: 'LIMIT',
            userId: 1,
        });
        //expect(OrderClientMock.getAllForUserId).toHaveBeenCalledWith(1);
    });



    it('should get a filled order', async () => {
        const orderService: OrderService = new OrderImpService(OrderClientMock, new MarketDataImpService(MarketDataClientMock));
        OrderClientMock.getAllForUserId.mockResolvedValue([{
            id: 0,
            instrumentId: 1,
            userId: 1,
            side: 'BUY',
            size: 1,
            price: 10,
            type: 'MARKET',
            status: 'NEW',
            datetime: new Date(),
        }]);

        OrderClientMock.getAllFilled.mockResolvedValue([{
            instrument_id: 1,
            ticker: 'Test',
            name: 'Un test',
            quantity: 10,
            last_price: 1,
            close_price: 2,
            avg_cost_price: 1.25,
            percentage_performance: 5,
            amount_performace: 5,
            total: 5,
        }]);

        OrderClientMock.getDisponibleForUser.mockResolvedValue(2000);
        OrderClientMock.saverOrder.mockResolvedValue({
            id: 1,
            instrumentId: 1,
            userId: 1,
            side: 'BUY',
            size: 1,
            price: 10,
            type: 'MARKET',
            status: 'NEW',
            datetime: new Date(),
        });

        const orderRequest: OrderRequest = {
            instrumentId: 1,
            price: 10,
            side: 'BUY', // Usamos el esquema de validación para 'side'
            size: 1,
            type: 'MARKET', // Ejemplo de otro enum
            userId: 1,
        };

        const response = await orderService.saveOrder(orderRequest);
        expect(OrderClientMock.saverOrder).toHaveBeenCalledWith({
            instrumentId: 1,
            price: 0,
            side: 'BUY',
            size: 1,
            status: 'FILLED',
            type: 'MARKET',
            userId: 1,
        });
        //expect(OrderClientMock.getAllForUserId).toHaveBeenCalledWith(1);
    });


    it('should rejected, when sell invalid instrument', async () => {
        const orderService: OrderService = new OrderImpService(OrderClientMock, new MarketDataImpService(MarketDataClientMock));
        OrderClientMock.getAllForUserId.mockResolvedValue([{
            id: 0,
            instrumentId: 1,
            userId: 1,
            side: 'SELL',
            size: 1,
            price: 10,
            type: 'LIMIT',
            status: 'NEW',
            datetime: new Date(),
        }]);

        OrderClientMock.getAllFilled.mockResolvedValue([{
            instrument_id: 2,
            ticker: 'Test',
            name: 'Un test',
            quantity: 10,
            last_price: 1,
            close_price: 2,
            avg_cost_price: 1.25,
            percentage_performance: 5,
            amount_performace: 5,
            total: 5,
        }]);

        OrderClientMock.getDisponibleForUser.mockResolvedValue(2000);
        OrderClientMock.saverOrder.mockResolvedValue({
            id: 1,
            instrumentId: 1,
            userId: 1,
            side: 'SELL',
            size: 1,
            price: 10,
            type: 'LIMIT',
            status: 'REJECTED',
            datetime: new Date(),
        });

        const orderRequest: OrderRequest = {
            instrumentId: 10,
            price: 10,
            side: 'SELL', // Usamos el esquema de validación para 'side'
            size: 1,
            type: 'LIMIT', // Ejemplo de otro enum
            userId: 1,
        };

        const response = await orderService.saveOrder(orderRequest);
        expect(OrderClientMock.saverOrder).toHaveBeenCalledWith({
            instrumentId: 10,
            price: 10,
            side: 'SELL',
            size: 1,
            type: 'LIMIT',
            userId: 1,
            status: 'REJECTED',
        });
        //expect(OrderClientMock.getAllForUserId).toHaveBeenCalledWith(1);
    });


    it('should rejected, when buy more available', async () => {
        const orderService: OrderService = new OrderImpService(OrderClientMock, new MarketDataImpService(MarketDataClientMock));
        OrderClientMock.getAllForUserId.mockResolvedValue([{
            id: 0,
            instrumentId: 1,
            userId: 1,
            side: 'BUY',
            size: 1,
            price: 10,
            type: 'LIMIT',
            status: 'NEW',
            datetime: new Date(),
        }]);

        OrderClientMock.getAllFilled.mockResolvedValue([{
            instrument_id: 2,
            ticker: 'Test',
            name: 'Un test',
            quantity: 10,
            last_price: 1,
            close_price: 2,
            avg_cost_price: 1.25,
            percentage_performance: 5,
            amount_performace: 5,
            total: 5,
        }]);

        OrderClientMock.getDisponibleForUser.mockResolvedValue(0);
        OrderClientMock.saverOrder.mockResolvedValue({
            id: 1,
            instrumentId: 1,
            userId: 1,
            side: 'BUY',
            size: 1,
            price: 10,
            type: 'LIMIT',
            status: 'REJECTED',
            datetime: new Date(),
        });

        const orderRequest: OrderRequest = {
            instrumentId: 10,
            price: 10,
            side: 'BUY', // Usamos el esquema de validación para 'side'
            size: 1,
            type: 'LIMIT', // Ejemplo de otro enum
            userId: 1,
        };

        const response = await orderService.saveOrder(orderRequest);
        expect(OrderClientMock.saverOrder).toHaveBeenCalledWith({
            instrumentId: 10,
            price: 10,
            side: 'BUY',
            size: 1,
            type: 'LIMIT',
            userId: 1,
            status: 'REJECTED',
        });
        //expect(OrderClientMock.getAllForUserId).toHaveBeenCalledWith(1);
    });
});