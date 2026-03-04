import express from 'express';
import { auth, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as partnerValidator from '../validators/partner.validator.js';
import * as partnerController from '../controllers/partner.controller.js';

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * /partners/onboard:
 *   post:
 *     summary: Onboard as a partner
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/onboard', partnerController.onboard);

/**
 * @swagger
 * /partners/profile:
 *   get:
 *     summary: Get partner profile
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/profile', partnerController.getProfile);

/**
 * @swagger
 * /partners:
 *   get:
 *     summary: Get all partners (Admin)
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', authorize('ADMIN'), partnerController.getAllPartners);

/**
 * @swagger
 * /partners/{partnerId}/status:
 *   patch:
 *     summary: Update partner status (Admin)
 *     tags: [Partners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.patch('/:partnerId/status', authorize('ADMIN'), validate(partnerValidator.updateStatus), partnerController.updateStatus);

export default router;
