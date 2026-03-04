import express from 'express';
import { auth, authorize } from '../middlewares/auth.js';
import * as adminController from '../controllers/admin.controller.js';
const router = express.Router();
router.use(auth);
router.use(authorize('ADMIN'));
/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/stats', adminController.getStats);
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/users', adminController.getAllUsers);
/**
 * @swagger
 * /admin/users/{userId}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.patch('/users/:userId/role', adminController.updateUserRole);
export default router;
