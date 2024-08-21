import * as z from 'zod';


export const MarketData = z.object({
  id: z.number().positive().optional(),
  instrumentId: z.number().positive(),
  high: z.number().nullable(),
  low: z.number().nullable(),
  open: z.number().nullable(),
  close: z.number().nullable(),
  previousClose: z.number().nullable(),
  date: z.coerce.date(),
});

type MarketDataModel = z.infer<typeof MarketData>;

export default MarketDataModel;