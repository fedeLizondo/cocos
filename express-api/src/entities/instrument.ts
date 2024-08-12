import * as z from 'zod'


export const Instrument = z.object({
    id: z.number().nonnegative().optional(),
    ticker: z.string().min(1),
    name: z.string().min(1),
    type: z.string().min(1)
});

type Instrument = z.infer<typeof Instrument>;

export default Instrument;