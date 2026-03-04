import Razorpay from 'razorpay';
import crypto from 'crypto';
import prisma from '../config/prisma.js';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
const razorpay = new Razorpay({
    key_id: config.razorpay.keyId,
    key_secret: config.razorpay.keySecret,
});
export const createOrder = async (bookingId, amount) => {
    const options = {
        amount: amount * 100, // amount in the smallest currency unit (paise)
        currency: 'INR',
        receipt: `receipt_${bookingId}`,
    };
    const order = await razorpay.orders.create(options);
    await prisma.payment.create({
        data: {
            bookingId,
            amount,
            paymentStatus: 'PENDING',
            razorpayId: order.id,
        },
    });
    return order;
};
export const verifyPayment = async (bookingId, razorpayData) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = razorpayData;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', config.razorpay.keySecret)
        .update(body.toString())
        .digest('hex');
    if (expectedSignature === razorpay_signature) {
        await prisma.payment.update({
            where: { bookingId },
            data: {
                paymentStatus: 'SUCCESS',
                razorpayId: razorpay_payment_id,
            },
        });
        await prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'ASSIGNED' }, // or keep as PENDING until assigned
        });
        return true;
    }
    else {
        await prisma.payment.update({
            where: { bookingId },
            data: { paymentStatus: 'FAILED' },
        });
        throw new ApiError(400, 'Invalid signature');
    }
};
