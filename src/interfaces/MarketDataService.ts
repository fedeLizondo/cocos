import MarketDataModel from 'Models/marketdata';
import MarketDataClient from './MarketDataClient';

export default interface MarketDataService {
  marketDataClient: MarketDataClient
  getAll(): Promise<MarketDataModel[]>
  getAllLatest(): Promise<MarketDataModel[]>
  getAllFromInstrument(instrumentId: number): Promise<MarketDataModel | null>
}