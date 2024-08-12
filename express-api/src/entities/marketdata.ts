import * as z from 'zod'


export const MarketData = z.object({
    id: z.number().positive().optional(),
    instrumentId: z.number().positive(),
    high: z.number().nullable(),
    low: z.number().nullable(),
    open: z.number().nullable(),
    close: z.number().nullable(),
    previousClose: z.number().nullable(),
    datetime: z.string().datetime()
});

type MarketData = z.infer<typeof MarketData>;

export default MarketData;