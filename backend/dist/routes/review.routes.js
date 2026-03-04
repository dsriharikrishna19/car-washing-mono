import express from 'express';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as reviewValidator from '../validators/review.validator.js';
import * as reviewController from '../controllers/review.controller.js';
const router = express.Router();
router.use(auth);
/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a review for a booking
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', validate(reviewValidator.createReview), reviewController.createReview);
/**
 * @swagger
 * /reviews/partner/{partnerId}:
 *   get:
 *     summary: Get reviews for a partner
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/partner/:partnerId', reviewController.getPartnerReviews);
/**
 * @swagger
 * /reviews/booking/{bookingId}:
 *   get:
 *     summary: Get review for a booking
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/booking/:bookingId', reviewController.getBookingReview);
export default router;
