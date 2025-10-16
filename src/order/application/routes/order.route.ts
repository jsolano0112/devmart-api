import { Router } from 'express';
import { OrderController } from '../controller/orders.controller';
import { validateOrderInformation } from '../middlewares/order.validator';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';
import { validateIdNumberParameter } from '../../../shared/helpers/get-id-number.validator';
import { validateUserIdNumberBody } from '../../../shared/helpers/user-id.validator';

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
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               userId: 1
 *               products:
 *                 - id: 1
 *                   count: 2
 *                 - id: 2
 *                   count: 1
 *               paymentMethod: 1
 *               total: 159.99
 *               address: "123 Main Street, Springfield"
 *               status: "PENDIENTE"
 *               createdAt: "2025-10-05T14:25:00Z"
 *               updatedAt: "2025-10-05T14:35:00Z"
 */
orderRouter.get('/:id', validateIdNumberParameter, controller.getById);

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
 *           type: string
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
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted.
 */
orderRouter.delete('/:id', validateIdNumberParameter, controller.delete);

export { orderRouter };
