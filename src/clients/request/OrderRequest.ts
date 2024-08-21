import * as z from 'zod';


/*export enum SideType {
  BUY = 'BUY',
  SELL = 'SELL',
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT',
}

const SideTypeSchema = z.nativeEnum(SideType);

export enum TypeType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
}

const TypeTypeSchema = z.nativeEnum(TypeType);

export enum StatusType {
  CANCELLED = 'CANCELLED',
  FILLED = 'FILLED',
  NEW = 'NEW',
  REJECTED = 'REJECTED',
}
const StatusTypeSchema = z.nativeEnum(StatusType);*/

export const Order = z.object({
  instrumentId: z.number().nonnegative(),
  price: z.number().nonnegative().optional(),
  side: z.enum(["BUY", "SELL", "CASH_IN", "CASH_OUT"]), // Usamos el esquema de validación para 'side'
  size: z.number().nonnegative(),
  type: z.enum(["LIMIT", "MARKET"]), // Ejemplo de otro enum
  userId: z.number().nonnegative(),
});

type OrderRequest = z.infer<typeof Order>;


export const OrderValidated = z.object({
  instrumentId: z.number().nonnegative(),
  price: z.number().nonnegative(),
  side: z.enum(["BUY", "SELL", "CASH_IN", "CASH_OUT"]), // Usamos el esquema de validación para 'side'
  size: z.number().nonnegative(),
  status: z.enum(['CANCELLED', 'FILLED', 'NEW', 'REJECTED']),
  type: z.enum(["LIMIT", "MARKET"]), // Ejemplo de otro enum
  userId: z.number().nonnegative()
});

export type OrderValidatedRequest = z.infer<typeof OrderValidated>;

export default OrderRequest;