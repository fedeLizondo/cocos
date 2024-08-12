import Instrument from "../entities/instrument";

export default interface InstrumentClient {
    getAll(): typeof Instrument[]
    getFromName(search: string): typeof Instrument[]
}