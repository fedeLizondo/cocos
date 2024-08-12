import * as z from 'zod'


export enum SideType {
    BUY = 'BUY',
    SELL = 'SELL',
    CASH_IN = 'CASH_IN',
    CASH_OUT = 'CASH_OUT'
}

const SideTypeSchema = z.nativeEnum(SideType);

export enum TypeType {
    MARKET = "MARKET",
    LIMIT = "LIMIT"
}

const TypeTypeSchema = z.nativeEnum(TypeType);

export enum StatusType {
    CANCELLED = 'CANCELLED',
    FILLED = 'FILLED',
    NEW = 'NEW',
    REJECTED = 'REJECTED'
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
    datetime: z.string().datetime()
});

type Order = z.infer<typeof Order>;

export default Order;