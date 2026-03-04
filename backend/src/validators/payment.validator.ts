import { z } from 'zod';

export const createOrder = z.object({
    body: z.object({
        bookingId: z.string().uuid(),
        amount: z.number().positive(),
    }),
});

export const verifyPayment = z.object({
    body: z.object({
        bookingId: z.string().uuid(),
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string(),
    }),
});
