import prisma from '../config/prisma.js';
export const getDashboardStats = async () => {
    const [userCount, bookingCount, partnerCount, totalRevenue] = await Promise.all([
        prisma.user.count(),
        prisma.booking.count(),
        prisma.partner.count(),
        prisma.payment.aggregate({
            where: { paymentStatus: 'SUCCESS' },
            _sum: { amount: true },
        }),
    ]);
    return {
        users: userCount,
        bookings: bookingCount,
        partners: partnerCount,
        revenue: totalRevenue._sum.amount || 0,
    };
};
export const getAllUsers = async (filter) => {
    return prisma.user.findMany({
        where: filter,
        include: {
            addresses: true,
            cars: true,
        },
    });
};
export const updateUserRole = async (userId, role) => {
    return prisma.user.update({
        where: { id: userId },
        data: { role },
    });
};
