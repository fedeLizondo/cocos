import * as z from 'zod';

/*
La respuesta deberá devolver el valor total de la cuenta de un usuario, 
sus pesos disponibles para operar y el 
listado de activos que posee 
(incluyendo cantidad de acciones, el valor total monetario de la posición ($) y el rendimiento total (%)).
*/


export const activo = z.object({
    instrument_id: z.number(),
    ticker: z.string(),
    name: z.string(),
    quantity: z.number(),
    last_price: z.number(),
    close_price: z.number(),
    avg_cost_price: z.number(),
    percentage_performance: z.number(),
    amount_performace: z.number(),
    total: z.number()
})

export type ActivoModel = z.infer<typeof activo>;

export const Portafolio = z.object({
    total: z.number(),
    disponible: z.number(),
    activos: z.array(activo)
});

type PortafolioModel = z.infer<typeof Portafolio>;

export default PortafolioModel;