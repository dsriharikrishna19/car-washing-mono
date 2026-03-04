import { PrismaClient } from '@prisma/client';
import { config } from './config.js';
const prisma = global.prisma || new PrismaClient();
if (config.env !== 'production') {
    global.prisma = prisma;
}
export default prisma;
