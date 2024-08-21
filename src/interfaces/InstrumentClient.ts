import InstrumentModel from '../Models/instrument';

export default interface InstrumentClient {
  getAll(): Promise<InstrumentModel[]>
  getFromName(search: string): Promise<InstrumentModel[]>
}