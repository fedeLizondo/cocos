import * as z from 'zod';

/*
La respuesta deberá devolver el valor total de la cuenta de un usuario, 
sus pesos disponibles para operar y el 
listado de activos que posee 
(incluyendo cantidad de acciones, el valor total monetario de la posición ($) y el rendimiento total (%)).
*/
export const Portafolio = z.object({
    total: z.number(),
    disponible: z.number(),
    activos: z.any()
});

type PortafolioModel = z.infer<typeof Portafolio>;

export default PortafolioModel;