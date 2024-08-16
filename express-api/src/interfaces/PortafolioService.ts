import PortafolioModel from './../Models/portafolio';


export default interface PortafolioService{
    getAll(): Promise<PortafolioModel>
}