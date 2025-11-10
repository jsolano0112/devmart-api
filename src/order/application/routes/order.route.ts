import { Router } from 'express';
import { OrderController } from '../controller/orders.controller';
import { validateOrderInformation } from '../middlewares/order.validator';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';
import { validateIdNumberParameter } from '../../../shared/helpers/get-id-number.validator';
import {
  validateUserIdNumberBody,
  validateUserIdNumberParameter,
} from '../../../shared/helpers/user-id.validator';

const controller = new OrderController();
const orderRouter: Router = Router();

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Order ID
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               products:
 *                 - sku: "ABC123"
 *                   count: 2
 *                 - sku: "ABC123"
 *                   count: 1
 *               paymentMethod: 1
 *               total: 159.99
 *               address: "123 Main Street, Springfield"
 *               status: "PENDIENTE"
 *               createdAt: "2025-10-05T14:25:00Z"
 *               updatedAt: "2025-10-05T14:35:00Z"
 */
orderRouter.get('/:id', validateIdNumberParameter,verifyAuthToken, controller.getById,);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order for the authenticated user.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *           example:
 *             userId: 1
 *             products:
 *               - sku: "ABC123"
 *                 count: 2
 *               - sku: "XYZ789"
 *                 count: 1
 *             paymentMethod: 1
 *             address: "123 Main Street, Springfield"
 *             status: "PENDIENTE"
 *     responses:
 *       201:
 *         description: Order created.
 */
orderRouter.post(
  '/',
  validateOrderInformation,
  validateUserIdNumberBody,
  verifyAuthToken,
  controller.create,
);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an existing order
 *     description: Updates the details of an existing order for the authenticated user.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrder'
 *           example:
 *             products:
 *               - sku: "ABC123"
 *                 count: 3
 *             paymentMethod: 2
 *             address: "45 Market Street, Springfield"
 *             status: "EN_TRANSITO"
 *     responses:
 *       200:
 *         description: Order updated.
 */
orderRouter.put(
  '/:id',
  validateOrderInformation,
  validateIdNumberParameter,
  verifyAuthToken,
  controller.update,
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted.
 */
orderRouter.delete(
  '/:id',
  validateIdNumberParameter,
  verifyAuthToken,
  controller.delete,
);

/**
 * @swagger
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted.
 */
orderRouter.patch(
  '/:id/cancel',
  validateIdNumberParameter,
  verifyAuthToken,
  controller.cancel,
);

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Get all orders for a specific user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
orderRouter.get(
  '/user/:userId',
  validateUserIdNumberParameter,
  verifyAuthToken,
  controller.getOrdersByUserId,
);

export { orderRouter };
