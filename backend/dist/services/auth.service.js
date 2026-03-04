import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
export const register = async (userData) => {
    const { email, phone, password, name, role } = userData;
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { phone }
            ]
        }
    });
    if (existingUser) {
        throw new ApiError(400, 'Email or Phone already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            phone,
            password: hashedPassword,
            name,
            role: role || 'CUSTOMER'
        }
    });
    return user;
};
export const login = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(401, 'Incorrect email or password');
    }
    return user;
};
