import * as reviewService from '../services/review.service.js';
import { catchAsync } from '../utils/catchAsync.js';
export const createReview = catchAsync(async (req, res) => {
    const { bookingId } = req.body;
    const review = await reviewService.createReview(bookingId, req.body);
    res.status(201).send(review);
});
export const getPartnerReviews = catchAsync(async (req, res) => {
    const reviews = await reviewService.getReviewsByPartner(req.params.partnerId);
    res.send(reviews);
});
export const getBookingReview = catchAsync(async (req, res) => {
    const review = await reviewService.getReviewsByBooking(req.params.bookingId);
    res.send(review);
});
