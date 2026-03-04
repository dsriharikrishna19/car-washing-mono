import prisma from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { BookingStatus } from '@prisma/client';

export const createBooking = async (userId: string, bookingData: any) => {
    const { serviceId, bookingTime } = bookingData;

    return prisma.booking.create({
        data: {
            userId,
            serviceId,
            bookingTime: new Date(bookingTime),
            status: 'PENDING',
        },
        include: {
            service: true,
            user: true,
        },
    });
};

export const getBookings = async (filter: any) => {
    return prisma.booking.findMany({
        where: filter,
        include: {
            service: true,
            user: true,
            partner: true,
        },
    });
};

export const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    return prisma.booking.update({
        where: { id: bookingId },
        data: { status },
    });
};

export const assignPartner = async (bookingId: string, partnerId: string) => {
    return prisma.booking.update({
        where: { id: bookingId },
        data: {
            partnerId,
            status: 'ASSIGNED',
        },
    });
};

export const cancelBooking = async (bookingId: string) => {
    return prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' },
    });
};

export const getBookingById = async (bookingId: string) => {
    return prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
            service: true,
            user: true,
            partner: true,
            payment: true,
            review: true,
        },
    });
};
