import prisma from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
export const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
        include: {
            cars: true,
            addresses: true,
            partner: true,
        },
    });
};
export const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    return prisma.user.update({
        where: { id: userId },
        data: updateBody,
    });
};
export const addAddress = async (userId, addressData) => {
    return prisma.address.create({
        data: {
            ...addressData,
            userId,
        },
    });
};
export const addCar = async (userId, carData) => {
    return prisma.car.create({
        data: {
            ...carData,
            userId,
        },
    });
};
export const getAddresses = async (userId) => {
    return prisma.address.findMany({
        where: { userId },
    });
};
export const getCars = async (userId) => {
    return prisma.car.findMany({
        where: { userId },
    });
};
