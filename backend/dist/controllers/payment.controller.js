import * as paymentService from '../services/payment.service.js';
import { catchAsync } from '../utils/catchAsync.js';
export const createOrder = catchAsync(async (req, res) => {
    const { bookingId, amount } = req.body;
    const order = await paymentService.createOrder(bookingId, amount);
    res.status(201).send(order);
});
export const verifyPayment = catchAsync(async (req, res) => {
    const { bookingId } = req.body;
    const success = await paymentService.verifyPayment(bookingId, req.body);
    res.send({ success, message: 'Payment verified successfully' });
});
