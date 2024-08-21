import InstrumentModel from '../Models/instrument';
import InstrumentClient from '../interfaces/InstrumentClient';
import InstrumentService from '../interfaces/InstrumentService';


export default class InstrumentImpService implements InstrumentService {

    instrumentClient: InstrumentClient;

    constructor(instrumentClient: InstrumentClient) {
        this.instrumentClient = instrumentClient;
    }

    getAll(): Promise<InstrumentModel[]> {
        return this.instrumentClient.getAll();
    }

    getFromName(search: string): Promise<InstrumentModel[]> {
        return this.instrumentClient.getFromName(search);
    }

}