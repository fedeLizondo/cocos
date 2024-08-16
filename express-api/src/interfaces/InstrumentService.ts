import InstrumentModel from 'Models/instrument';
import InstrumentClient from './InstrumentClient';

export default interface InstrumentService {
  instrumentClient: InstrumentClient
  getAll(): Promise<InstrumentModel[]>
  getFromName(search: string): Promise<InstrumentModel[]>
}