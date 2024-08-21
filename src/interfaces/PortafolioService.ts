import PortafolioModel from '../Models/portafolio';


export default interface PortafolioService{
    getAll(userId:number): Promise<PortafolioModel>
}