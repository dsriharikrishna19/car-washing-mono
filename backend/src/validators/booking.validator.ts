import { z } from 'zod';

export const createBooking = z.object({
    body: z.object({
        serviceId: z.string().uuid(),
        bookingTime: z.string().datetime(),
    }),
});

export const updateStatus = z.object({
    body: z.object({
        status: z.enum(['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
    }),
});

export const assignPartner = z.object({
    body: z.object({
        partnerId: z.string().uuid(),
    }),
});
