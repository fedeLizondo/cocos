import express from 'express'
import Instrument from '../entities/instrument';


const router = express.Router();

router.get<{}, typeof Instrument[]>("/",(req,res) => {
    return res.json([]);
})


export default router;