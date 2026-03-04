import nodemailer from 'nodemailer';
import prisma from '../config/prisma.js';
import { config } from '../config/config.js';

const transporter = nodemailer.createTransport(config.email.smtp);

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
    const msg = { from: config.email.from, to, subject, text, html };
    await transporter.sendMail(msg);
};

export const createNotification = async (userId: string, message: string) => {
    return prisma.notification.create({
        data: {
            userId,
            message,
        },
    });
};

export const getNotifications = async (userId: string) => {
    return prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
};

export const markAsRead = async (notificationId: string) => {
    return prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
    });
};
