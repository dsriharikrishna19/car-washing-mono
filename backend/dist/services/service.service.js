import prisma from '../config/prisma.js';
export const createCategory = async (categoryData) => {
    return prisma.serviceCategory.create({
        data: categoryData,
    });
};
export const getCategories = async () => {
    return prisma.serviceCategory.findMany({
        include: { services: true },
    });
};
export const createService = async (serviceData) => {
    return prisma.service.create({
        data: serviceData,
    });
};
export const getServicesByCategory = async (categoryId) => {
    return prisma.service.findMany({
        where: { categoryId },
    });
};
export const getAllServices = async () => {
    return prisma.service.findMany({
        include: { category: true },
    });
};
