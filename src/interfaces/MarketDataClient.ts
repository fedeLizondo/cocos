import MarketDataModel from "Models/marketdata"


export default interface MarketDataClient {
    getAll(): Promise<MarketDataModel[]>
    getAllLatest(): Promise<MarketDataModel[]>
    getAllFromInstrument(instrumentId: number): Promise<MarketDataModel|null>
  }