import { z } from 'zod';
export const updateProfile = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        phone: z.string().min(10).optional(),
    }),
});
export const addAddress = z.object({
    body: z.object({
        location: z.string().min(5),
    }),
});
export const addCar = z.object({
    body: z.object({
        model: z.string().min(2),
        carType: z.enum(['HATCHBACK', 'SEDAN', 'SUV', 'LUXURY']),
    }),
});
