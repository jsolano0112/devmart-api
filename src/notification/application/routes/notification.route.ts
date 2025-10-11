import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { validateId } from '../../../shared/helpers/get-id.validator';
import { validateCreateNotification } from '../middlewares/create-notification.validator';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';

const controller = new NotificationController();
const notificationRouter: Router = Router();

/**
 * @swagger
 * /notifications/getByUser/{id}:
 *   get:
 *     summary: Get all notifications by user ID
 *     description: Returns all notifications associated with the given user ID.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notifications for the user.
 *         content:
 *           application/json:
 *             example:
 *               - id: "64c8d7e2a123456789abcd01"
 *                 type: "info"
 *                 message: "Your order has been shipped."
 *                 userId: "64c8d7e2a123456789abcd99"
 *                 createdAt: "2025-10-05T14:32:00Z"
 *               - id: "64c8d7e2a123456789abcd02"
 *                 type: "warning"
 *                 message: "Payment pending for your last order."
 *                 userId: "64c8d7e2a123456789abcd99"
 *                 createdAt: "2025-10-04T10:15:00Z"
 */

notificationRouter.get(
  '/getByUser/:id',
  validateId,
  verifyAuthToken,
  controller.getByUser,
);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     description: Creates a notification for a specific user.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             type: "info"
 *             message: "Your order #12345 has been shipped."
 *             userId: "64c8d7e2a123456789abcd99"
 *             createdAt: "2025-10-05T14:32:00Z"
 *     responses:
 *       200:
 *         description: Notification created.
 */
notificationRouter.post(
  '/',
  validateCreateNotification,
  verifyAuthToken,
  controller.create,
);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted.
 */
notificationRouter.delete(
  '/:id',
  validateId,
  verifyAuthToken,
  controller.delete,
);

export { notificationRouter };
