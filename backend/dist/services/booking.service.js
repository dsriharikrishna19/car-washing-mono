import prisma from '../config/prisma.js';
export const createBooking = async (userId, bookingData) => {
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
export const getBookings = async (filter) => {
    return prisma.booking.findMany({
        where: filter,
        include: {
            service: true,
            user: true,
            partner: true,
        },
    });
};
export const updateBookingStatus = async (bookingId, status) => {
    return prisma.booking.update({
        where: { id: bookingId },
        data: { status },
    });
};
export const assignPartner = async (bookingId, partnerId) => {
    return prisma.booking.update({
        where: { id: bookingId },
        data: {
            partnerId,
            status: 'ASSIGNED',
        },
    });
};
export const cancelBooking = async (bookingId) => {
    return prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' },
    });
};
export const getBookingById = async (bookingId) => {
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
