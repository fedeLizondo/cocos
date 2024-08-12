import Instrument from "../entities/instrument";
import InstrumentClient from "./InstrumentClient";

export default interface InstrumentService {
    instrumentClient: InstrumentClient
    getAll(): typeof Instrument[]
    getFromName(search: string): typeof Instrument[]
}