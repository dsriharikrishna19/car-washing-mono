import prisma from '../config/prisma.js';

export const createCategory = async (categoryData: { name: string }) => {
    return prisma.serviceCategory.create({
        data: categoryData,
    });
};

export const getCategories = async () => {
    return prisma.serviceCategory.findMany({
        include: { services: true },
    });
};

export const createService = async (serviceData: any) => {
    return prisma.service.create({
        data: serviceData,
    });
};

export const getServicesByCategory = async (categoryId: string) => {
    return prisma.service.findMany({
        where: { categoryId },
    });
};

export const getAllServices = async () => {
    return prisma.service.findMany({
        include: { category: true },
    });
};
