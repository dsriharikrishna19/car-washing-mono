import { z } from 'zod';
export const createCategory = z.object({
    body: z.object({
        name: z.string().min(2),
    }),
});
export const createService = z.object({
    body: z.object({
        name: z.string().min(2),
        price: z.number().positive(),
        duration: z.number().int().positive(),
        categoryId: z.string().uuid(),
    }),
});
