import { z } from 'zod';
export const register = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(2),
        phone: z.string().min(10),
        role: z.enum(['CUSTOMER', 'PARTNER', 'ADMIN']).optional(),
    }),
});
export const login = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});
