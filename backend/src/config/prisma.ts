import { PrismaClient } from '@prisma/client';
import { config } from './config.js';

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (config.env !== 'production') {
    global.prisma = prisma;
}

export default prisma;
