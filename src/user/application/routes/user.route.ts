import { Router } from 'express';
import { validateUserInfo } from '../middlewares/user.validator';
import { validateAuthentication } from '../middlewares/authenticate-user.validator';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';
import { UserController } from '../controller/users.controller';
import {
  validateIdNumberParameter,
} from '../../../shared/helpers/get-id-number.validator';
const controller = new UserController();
const userRouter: Router = Router();
const authRouter: Router = Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               id: "64a8f6e2c123456789abcd01"
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               address: "123 Main Street"
 *               mobilePhone: "312XXXXXXX"
 *               city: "New York"
 *               zipCode: 10001
 */
userRouter.get(
  '/:id',
  validateIdNumberParameter,
  verifyAuthToken,
  controller.getById,
);

/**
 * @swagger
 *  /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               address: "123 Main Street"
 *               mobilePhone: "312XXXXXX"
 *               city: "New York"
 *               zipCode: 10001
 *               password: "password123"
 *               isAdmin: false
 *     responses:
 *       200:
 *         description: User created.
 */

userRouter.post('/', validateUserInfo, controller.create);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id: 1
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             address: "123 Main Street"
 *             mobilePhone: "312XXXXXXX"
 *             city: "New York"
 *             zipCode: 10001
 *             isActive: true
 *             password: password123
 *     responses:
 *       200:
 *         description: User updated.
 */
userRouter.put(
  '/:id',
  validateUserInfo,
  validateIdNumberParameter,
  verifyAuthToken,
  controller.update,
);

/**
 * @swagger
 * /users/{userId}/orders:
 *   get:
 *     summary: Get all orders for a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 userId: "1"
 *                 count: 3
 *                 total: 150000
 *                 createdAt: "2025-10-05T10:00:00Z"
 *                 updatedAt: "2025-10-05T10:10:00Z"
 *       204:
 *         description: No orders found
 */
userRouter.get(
  '/:userId/orders',
  validateIdNumberParameter,
  verifyAuthToken,
  controller.getOrdersById,
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: john.doe@example.com
 *             password: password123
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: "1"
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 isAdmin:
 *                   type: boolean
 *                   example: false
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
authRouter.post('/login', validateAuthentication, controller.auth);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh JWT tokens using a valid refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: "1"
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 isAdmin:
 *                   type: boolean
 *                   example: false
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Missing refresh token
 *       401:
 *         description: Invalid or expired refresh token
 */
authRouter.post('/refresh', controller.refresh);

export { userRouter, authRouter };
