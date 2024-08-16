import * as z from 'zod';


export enum SideType {
  BUY = 'BUY',
  SELL = 'SELL',
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT',
}

export const StringToSideType: Record<string, SideType> = {
  'BUY': SideType.BUY,
  'SELL': SideType.SELL,
  'CASH_IN': SideType.CASH_IN,
  'CASH_OUT': SideType.CASH_OUT
}

const SideTypeSchema = z.nativeEnum(SideType);

export enum TypeType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
}

export const StringToTypeType: Record<string, TypeType> = {
  "MARKET": TypeType.MARKET,
  "LIMIT": TypeType.LIMIT
}

const TypeTypeSchema = z.nativeEnum(TypeType);

export enum StatusType {
  CANCELLED = 'CANCELLED',
  FILLED = 'FILLED',
  NEW = 'NEW',
  REJECTED = 'REJECTED',
}

export const StringToStatusType: Record<string, StatusType> = {
  'CANCELLED': StatusType.CANCELLED,
  'FILLED': StatusType.FILLED,
  'NEW': StatusType.NEW,
  'REJECTED': StatusType.REJECTED,
}

const StatusTypeSchema = z.nativeEnum(StatusType);

export const Order = z.object({
  id: z.number().nonnegative().optional(),
  instrumentId: z.number().nonnegative(),
  userId: z.number().nonnegative(),
  side: SideTypeSchema,
  size: z.number(),
  type: TypeTypeSchema,
  status: StatusTypeSchema.optional(),
  datetime: z.string().datetime(),
});

type OrderModel = z.infer<typeof Order>;

export default OrderModel;