import MarketData from '../Models/marketdata';

export default interface MarketDataService {
  getAll(): typeof MarketData[]
  getAllFromInstrument(instrumentId: number): typeof MarketData[]
}