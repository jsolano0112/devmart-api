import { Router } from 'express';
import { validateCreateShipment } from '../middlewares/create-shipment.validator';
import { validateUpdateShipment } from '../middlewares/update-shipment.validator';
import { validateTrackingNumber } from '../../../shared/helpers/trackingNumber-validator';
import { ShipmentController } from '../controller/shipment.controller';

const shipment = new ShipmentController();
const shipmentRouter: Router = Router();

/**
 * @swagger
 * /shipments/{trackingNumber}:
 *   get:
 *     summary: Get shipment by tracking number
 *     description: Retrieve detailed shipment information using its unique tracking number.
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *         example: "TRK-20251011-00045"
 *     responses:
 *       200:
 *         description: Shipment retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 15
 *               orderId: 103
 *               status: "EN_TRANSITO"
 *               carrier: "Envía"
 *               trackingId: "TRK-20251011-00045"
 *               createdAt: "2025-10-11T10:15:00Z"
 *               updatedAt: "2025-10-11T14:30:00Z"
 *       404:
 *         description: Shipment not found
 */
shipmentRouter.get(
  '/:trackingNumber',
  validateTrackingNumber,
  shipment.getByTrackingId,
);

/**
 * @swagger
 * /shipments:
 *   post:
 *     summary: Create a new shipment
 *     description: Registers a new shipment in the system associated with an existing order.
 *     tags: [Shipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             orderId: 103
 *             status: "PENDIENTE"
 *             carrier: "Servientrega"
 *             trackingId: "TRK-20251011-00046"
 *     responses:
 *       201:
 *         description: Shipment created successfully
 */
shipmentRouter.post('/', validateCreateShipment, shipment.create);

/**
 * @swagger
 * /shipments:
 *   get:
 *     summary: Get all shipments
 *     description: Retrieve the list of all registered shipments.
 *     tags: [Shipments]
 *     responses:
 *       200:
 *         description: List of shipments
 *         content:
 *           application/json:
 *             example:
 *               - id: 12
 *                 orderId: 101
 *                 status: "EN_TRANSITO"
 *                 carrier: "Servientrega"
 *                 trackingId: "TRK-20251010-00044"
 *                 createdAt: "2025-10-10T09:00:00Z"
 *                 updatedAt: "2025-10-10T13:15:00Z"
 *               - id: 13
 *                 orderId: 102
 *                 status: "ENTREGADO"
 *                 carrier: "Coordinadora"
 *                 trackingId: "TRK-20251010-00045"
 *                 createdAt: "2025-10-10T09:10:00Z"
 *                 updatedAt: "2025-10-11T08:40:00Z"
 *       204:
 *         description: No shipments found
 */

shipmentRouter.get('/', shipment.getShipments);

/**
 * @swagger
 * /shipments/{trackingNumber}:
 *   put:
 *     summary: Update shipment status
 *     description: Update shipment information or status based on its tracking number.
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *         example: "TRK-20251011-00046"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             trackingId: "TRK-20251011-00046"
 *             status: "EN_ENTREGA"
 *             updatedAt: "2025-10-11T15:00:00Z"
 *     responses:
 *       200:
 *         description: Shipment updated successfully
 */
shipmentRouter.put('/:trackingId', validateUpdateShipment, shipment.update);
shipmentRouter.delete('/:trackingNumber', validateTrackingNumber, shipment.delete);

export { shipmentRouter };
