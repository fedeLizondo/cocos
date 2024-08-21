import MarketDataClient from "interfaces/MarketDataClient";
import MarketDataModel from "Models/marketdata";
import { AppDataSource } from "./db";
import { MarketData, toMarketDataModel } from "./entity/MarketData";


const marketDataRepository = AppDataSource.getRepository(MarketData);
export class MarketDataImpClient implements MarketDataClient {
    async getAll(): Promise<MarketDataModel[]> {
        const marketData = marketDataRepository.find();

        try {
            const result = await marketData;
            return result.map(marketData => toMarketDataModel(marketData));
        } catch (_) {
            return [];
        }

    }
    async getAllLatest(): Promise<MarketDataModel[]> {
        try {
            const latestMarketData = await marketDataRepository
                .createQueryBuilder('marketdata')
                .where(qb => {
                    const subQuery = qb
                        .subQuery()
                        .select('MAX(m.date)', 'maxDate')
                        .from(MarketData, 'm')
                        .where('m.instrumentid = marketdata.instrumentid')
                        .getQuery();
                    return `marketdata.date = (${subQuery})`;
                }
                )
                .getMany();
            return latestMarketData.map(marketData => toMarketDataModel(marketData));

        } catch (_) {
            return [];
        }
    }

    async getAllFromInstrument(instrumentId: number): Promise<MarketDataModel | null> {
        try {
            const latestMarketData = await marketDataRepository
                .createQueryBuilder('marketdata')
                .where(qb => {
                    const subQuery = qb
                        .subQuery()
                        .select('MAX(m.date)', 'maxDate')
                        .from(MarketData, 'm')
                        .where('m.instrumentid = marketdata.instrumentid')
                        .getQuery();
                    return `marketdata.date = (${subQuery})`;
                }
                )
                .where('marketdata.instrumentid = :instrument', { instrument: instrumentId })
                .getOne();

            if (latestMarketData == null) {
                return null;
            }

            return toMarketDataModel(latestMarketData);

        } catch (e) {
            return null;
        }
    }

}