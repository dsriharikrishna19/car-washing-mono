import express from 'express';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as paymentValidator from '../validators/payment.validator.js';
import * as paymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * /payments/create-order:
 *   post:
 *     summary: Create a Razorpay order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/create-order', validate(paymentValidator.createOrder), paymentController.createOrder);

/**
 * @swagger
 * /payments/verify:
 *   post:
 *     summary: Verify Razorpay payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/verify', validate(paymentValidator.verifyPayment), paymentController.verifyPayment);

export default router;
