import * as z from 'zod';


export const Order = z.object({
  id: z.number().nonnegative().optional(),
  instrumentId: z.number().nonnegative(),
  userId: z.number().nonnegative(),
  side: z.enum(["BUY", "SELL", "CASH_IN", "CASH_OUT"]),
  size: z.number(),
  price: z.number(),
  type: z.enum(["MARKET", "LIMIT"]),
  status: z.enum(["NEW", "FILLED", "REJECTED", "CANCELLED"]),
  datetime: z.date().optional()
});

type OrderModel = z.infer<typeof Order>;

export default OrderModel;