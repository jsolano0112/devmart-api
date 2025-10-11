import { Router } from 'express';
import { validateUpdate } from '../middlewares/update-user.validator';
import { validateId } from '../../../shared/helpers/get-id.validator';
import { validateCreate } from '../middlewares/create-user.validator';
import { validateAuthentication } from '../middlewares/authenticate-user.validator';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';
import { UserController } from '../controller/users.controller';
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
 *           type: string
 *         example: 64a8f6e2c123456789abcd01
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
 *               mobilePhone: "+1 555 123 4567"
 *               city: "New York"
 *               zipCode: 10001
 */
userRouter.get('/:id', validateId, verifyAuthToken, controller.getById);

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

userRouter.post('/', validateCreate, controller.create);

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
 *             id: "64a8f6e2c123456789abcd01"
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             address: "123 Main Street"
 *             mobilePhone: "+1 555 123 4567"
 *             city: "New York"
 *             zipCode: 10001
 *             isActive: true
 *             password: password123
 *     responses:
 *       200:
 *         description: User updated.
 */
userRouter.put('/', validateUpdate, verifyAuthToken, controller.update);

/**
 * @swagger
 * /users/{id}/orders:
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
 *           type: string
 *         example: 64a8f6e2c123456789abcd01
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               - id: "64a8f6e2c123456789abcd01"
 *                 userId: "64a8f6e2c123456789abcd01"
 *                 count: 3
 *                 total: 150000
 *                 createdAt: "2025-10-05T10:00:00Z"
 *                 updatedAt: "2025-10-05T10:10:00Z"
 *       204:
 *         description: No orders found
 */
userRouter.get(
  '/:id/orders',
  validateId,
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
 *             example:
 *               id: "64a8f6e2c123456789abcd01"
 *               email: john.doe@example.com
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               firstname: John
 *               lastname: Doe
 *               isAdmin: false
 */
authRouter.post('/login', validateAuthentication, controller.auth);

//TODO
// authRouter.post('/logout', validateAuthentication, controller.auth);
// authRouter.post('/refresh', validateAuthentication, controller.auth);

export { userRouter, authRouter };
