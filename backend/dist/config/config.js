import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });
export const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    prisma: {
        databaseUrl: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || '30',
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || '30',
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID,
        keySecret: process.env.RAZORPAY_KEY_SECRET,
    },
    email: {
        smtp: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 2525,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        },
        from: process.env.EMAIL_FROM,
    },
};
