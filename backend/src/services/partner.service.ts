import prisma from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { PartnerStatus } from '@prisma/client';

export const createPartner = async (userId: string) => {
    const existingPartner = await prisma.partner.findUnique({
        where: { userId },
    });

    if (existingPartner) {
        throw new ApiError(400, 'User is already a partner');
    }

    return prisma.partner.create({
        data: {
            userId,
            status: 'PENDING',
        },
    });
};

export const updatePartnerStatus = async (partnerId: string, status: PartnerStatus) => {
    return prisma.partner.update({
        where: { id: partnerId },
        data: { status },
    });
};

export const getPartnerProfile = async (userId: string) => {
    return prisma.partner.findUnique({
        where: { userId },
        include: {
            user: true,
            bookings: {
                include: {
                    service: true,
                    user: true,
                },
            },
        },
    });
};

export const getAllPartners = async (filter: any) => {
    return prisma.partner.findMany({
        where: filter,
        include: {
            user: true,
        },
    });
};
