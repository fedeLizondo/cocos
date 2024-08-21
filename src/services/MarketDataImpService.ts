import MarketDataClient from "interfaces/MarketDataClient";
import MarketDataService from "interfaces/MarketDataService";
import MarketDataModel from "Models/marketdata";


export class MarketDataImpService implements MarketDataService {
    marketDataClient: MarketDataClient;
    constructor(marketDataClient: MarketDataClient) {
        this.marketDataClient = marketDataClient;
    }

    getAll(): Promise<MarketDataModel[]> {
        return this.marketDataClient.getAll();
    }
    getAllLatest(): Promise<MarketDataModel[]> {
        return this.marketDataClient.getAllLatest();
    }
    getAllFromInstrument(instrumentId: number): Promise<MarketDataModel | null> {
        return this.marketDataClient.getAllFromInstrument(instrumentId);
    }
}