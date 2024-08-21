import express from 'express'
import PortafolioService from '../interfaces/PortafolioService';
import PortafolioImpService from '../services/PortafolioImpService';
import { notFound } from '../middlewares';



const router = express.Router();

const portafolioService: PortafolioService = new PortafolioImpService()

router.get<{ id: number }, {}>('/:id', async (req, res, next) => {
    try {

        const id = req.params.id as number;
        if (!!id) {
            const cancellOrder = await portafolioService.getAll(id)
            if (cancellOrder != null) {
                return res.json(cancellOrder)
            }
        }
        notFound(null, res, next)
    } catch (error) {
        next(error);
    }

})




export default router;