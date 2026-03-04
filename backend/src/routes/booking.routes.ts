import express from 'express';
import { auth, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as bookingValidator from '../validators/booking.validator.js';
import * as bookingController from '../controllers/booking.controller.js';

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', validate(bookingValidator.createBooking), bookingController.createBooking);

/**
 * @swagger
 * /bookings/my:
 *   get:
 *     summary: Get my bookings (as customer)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/my', bookingController.getMyBookings);

/**
 * @swagger
 * /bookings/partner:
 *   get:
 *     summary: Get partner bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/partner', authorize('PARTNER', 'ADMIN'), bookingController.getPartnerBookings);

/**
 * @swagger
 * /bookings/{bookingId}:
 *   get:
 *     summary: Get booking details
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:bookingId', bookingController.getBooking);

/**
 * @swagger
 * /bookings/{bookingId}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.patch('/:bookingId/status', validate(bookingValidator.updateStatus), bookingController.updateStatus);

/**
 * @swagger
 * /bookings/{bookingId}/assign:
 *   patch:
 *     summary: Assign partner to booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.patch('/:bookingId/assign', authorize('ADMIN'), validate(bookingValidator.assignPartner), bookingController.assignPartner);

export default router;
