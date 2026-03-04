import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.js';
import * as bookingService from '../services/booking.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';

export const createBooking = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const booking = await bookingService.createBooking(req.user.id, req.body);
    res.status(201).send(booking);
});

export const getMyBookings = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const bookings = await bookingService.getBookings({ userId: req.user.id });
    res.send(bookings);
});

export const getPartnerBookings = catchAsync(async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Unauthorized');
    const bookings = await bookingService.getBookings({ partnerId: req.user.id });
    res.send(bookings);
});

export const updateStatus = catchAsync(async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.updateBookingStatus(req.params.bookingId as string, req.body.status);
    res.send(booking);
});

export const assignPartner = catchAsync(async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.assignPartner(req.params.bookingId as string, req.body.partnerId);
    res.send(booking);
});

export const getBooking = catchAsync(async (req: AuthRequest, res: Response) => {
    const booking = await bookingService.getBookingById(req.params.bookingId as string);
    if (!booking) throw new ApiError(404, 'Booking not found');
    res.send(booking);
});
