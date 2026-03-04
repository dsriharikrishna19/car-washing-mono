import express from 'express';
import { auth, authorize } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as serviceValidator from '../validators/service.validator.js';
import * as serviceController from '../controllers/service.controller.js';

const router = express.Router();

/**
 * @swagger
 * /services/categories:
 *   get:
 *     summary: Get all service categories
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/categories', serviceController.getCategories);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', serviceController.getAllServices);

/**
 * @swagger
 * /services/category/{categoryId}:
 *   get:
 *     summary: Get services by category
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/category/:categoryId', serviceController.getServicesByCategory);

// Admin routes
router.post('/categories', auth, authorize('ADMIN'), validate(serviceValidator.createCategory), serviceController.createCategory);
router.post('/', auth, authorize('ADMIN'), validate(serviceValidator.createService), serviceController.createService);

export default router;
