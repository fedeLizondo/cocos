import * as z from 'zod'

export const User = z.object({
    id: z.number().nonnegative().optional(),
    email: z.string().min(1).email(),
    accountNumber: z.number()
});

type User = z.infer<typeof User>

export default User;