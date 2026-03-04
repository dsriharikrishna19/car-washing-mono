import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.js';
import * as reviewService from '../services/review.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';

export const createReview = catchAsync(async (req: AuthRequest, res: Response) => {
    const { bookingId } = req.body;
    const review = await reviewService.createReview(bookingId, req.body);
    res.status(201).send(review);
});

export const getPartnerReviews = catchAsync(async (req: AuthRequest, res: Response) => {
    const reviews = await reviewService.getReviewsByPartner(req.params.partnerId as string);
    res.send(reviews);
});

export const getBookingReview = catchAsync(async (req: AuthRequest, res: Response) => {
    const review = await reviewService.getReviewsByBooking(req.params.bookingId as string);
    res.send(review);
});
