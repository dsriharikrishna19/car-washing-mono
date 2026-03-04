import prisma from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export const createReview = async (bookingId: string, reviewData: any) => {
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
    });

    if (!booking) {
        throw new ApiError(404, 'Booking not found');
    }

    if (booking.status !== 'COMPLETED') {
        throw new ApiError(400, 'Only completed bookings can be reviewed');
    }

    return prisma.review.create({
        data: {
            bookingId,
            ...reviewData,
        },
    });
};

export const getReviewsByPartner = async (partnerId: string) => {
    return prisma.review.findMany({
        where: {
            booking: {
                partnerId,
            },
        },
        include: {
            booking: {
                include: {
                    user: true,
                },
            },
        },
    });
};

export const getReviewsByBooking = async (bookingId: string) => {
    return prisma.review.findUnique({
        where: { bookingId },
    });
};
