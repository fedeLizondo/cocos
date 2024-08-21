import express from 'express';
import InstrumentService from '../interfaces/InstrumentService';
import InstrumentImpService from '../services/InstrumentImpService';
import InstrumentClient from '../interfaces/InstrumentClient';
import InstrumentImpClient from '../clients/InstrumentImpClient';
import InstrumentModel from 'Models/instrument';


const router = express.Router();

const instrumentClient: InstrumentClient = new InstrumentImpClient();
const instrumentService: InstrumentService = new InstrumentImpService(instrumentClient);

router.get<{}, InstrumentModel[]>('/', async (req, res) => {
    const search = req.query.search as string;
    if (!!search) {
        return res.json(await instrumentService.getFromName(search));
    }

    return res.json(await instrumentService.getAll());
});


export default router;