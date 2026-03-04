import { z } from 'zod';
export const updateStatus = z.object({
    body: z.object({
        status: z.enum(['PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED']),
    }),
});
