import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.js';
import * as paymentService from '../services/payment.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';

export const createOrder = catchAsync(async (req: AuthRequest, res: Response) => {
    const { bookingId, amount } = req.body;
    const order = await paymentService.createOrder(bookingId, amount);
    res.status(201).send(order);
});

export const verifyPayment = catchAsync(async (req: AuthRequest, res: Response) => {
    const { bookingId } = req.body;
    const success = await paymentService.verifyPayment(bookingId, req.body);
    res.send({ success, message: 'Payment verified successfully' });
});
