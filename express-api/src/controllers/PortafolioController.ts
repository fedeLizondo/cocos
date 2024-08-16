import express from 'express'
import PortafolioService from '../interfaces/PortafolioService';
import PortafolioImpService from '../services/PortafolioImpService';



const router = express.Router();

const portafolioService = new PortafolioImpService()

router.get<{},{}>('/', async(req, res)=>{
    return res.json(await portafolioService.getAll())
})




export default router;