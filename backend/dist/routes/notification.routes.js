import express from 'express';
import { auth } from '../middlewares/auth.js';
import * as notificationController from '../controllers/notification.controller.js';
const router = express.Router();
router.use(auth);
/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get my notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', notificationController.getMyNotifications);
/**
 * @swagger
 * /notifications/{notificationId}/read:
 *   patch:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.patch('/:notificationId/read', notificationController.markAsRead);
export default router;
