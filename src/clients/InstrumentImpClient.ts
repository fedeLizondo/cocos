import { ILike } from 'typeorm/find-options/operator/ILike';
import InstrumentClient from '../interfaces/InstrumentClient';
import { AppDataSource } from './db';
import { Instrument, toInstrumentModel } from './entity/Instrument';
import InstrumentModel from 'Models/instrument';



const instrumentRepository = AppDataSource.getRepository(Instrument);

export default class InstrumentImpClient implements InstrumentClient {
    async getAll(): Promise<InstrumentModel[]> {
        const instruments = instrumentRepository.find();

        try {
            const result = await instruments;
            return result.map(instrument => toInstrumentModel(instrument));
        } catch (_) {
            return [];
        }
    }

    async getFromName(search: string): Promise<InstrumentModel[]> {
        const instruments = instrumentRepository.find({
            where: [
                { name: ILike(`%${search}%`) },
                { ticker: ILike(`%${search}%`) }
            ]
        });

        try {
            const result = await instruments;
            return result.map(instrument => toInstrumentModel(instrument));
        } catch (_) {
            return [];
        }
    }

}