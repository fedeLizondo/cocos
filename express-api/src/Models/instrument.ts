import * as z from 'zod';


const Instrument = z.object({
  id: z.number().nonnegative().optional(),
  ticker: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
});

type InstrumentModel = z.infer<typeof Instrument>;

export default InstrumentModel;