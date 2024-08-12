import Instrument from "../entities/instrument";
import InstrumentClient from "../interfaces/InstrumentClient";
import InstrumentService from "../interfaces/InstrumentService";


export default class InstrumentImpService implements InstrumentService {

    instrumentClient: InstrumentClient;
    constructor(instrumentClient: InstrumentClient) {
        this.instrumentClient = instrumentClient;
    }

    getAll(): typeof Instrument[] {
        return this.instrumentClient.getAll();
    }

    getFromName(search: string): typeof Instrument[] {
        return this.instrumentClient.getFromName(search);
    }

}