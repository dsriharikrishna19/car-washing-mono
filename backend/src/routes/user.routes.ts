import express from 'express';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as userValidator from '../validators/user.validator.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/profile', userController.getProfile);

/**
 * @swagger
 * /users/profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.patch('/profile', validate(userValidator.updateProfile), userController.updateProfile);

/**
 * @swagger
 * /users/addresses:
 *   post:
 *     summary: Add an address
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [location]
 *             properties:
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/addresses', validate(userValidator.addAddress), userController.addAddress);

/**
 * @swagger
 * /users/addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/addresses', userController.getAddresses);

/**
 * @swagger
 * /users/cars:
 *   post:
 *     summary: Add a car
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [model, carType]
 *             properties:
 *               model:
 *                 type: string
 *               carType:
 *                 type: string
 *                 enum: [HATCHBACK, SEDAN, SUV, LUXURY]
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/cars', validate(userValidator.addCar), userController.addCar);

/**
 * @swagger
 * /users/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/cars', userController.getCars);

export default router;
