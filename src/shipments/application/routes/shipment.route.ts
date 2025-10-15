import { Router } from 'express';
import { validateCreateShipment } from '../middlewares/create-shipment.validator';
import { validateUpdateShipment } from '../middlewares/update-shipment.validator';
import { validateTrackingNumber } from '../../../shared/helpers/trackingNumber-validator';
import { ShipmentController } from '../controller/shipment-controller';

const shipment = new ShipmentController();
const shipmentRouter: Router = Router();

/**
 * @openapi
 * /shipments/{trackingNumber}:
 *   get:
 *     tags:
 *       - Shipments
 *     summary: Obtener shipment por tracking number
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Shipment\n
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 *       '204':
 *         description: No content
 */

shipmentRouter.get('/:trackingNumber', validateTrackingNumber, shipment.getByTrackingId);
shipmentRouter.post('/', validateCreateShipment, shipment.create);
shipmentRouter.get('/', shipment.getShipments);
shipmentRouter.put('/:trackingNumber', validateUpdateShipment, shipment.update);
shipmentRouter.delete('/:trackingNumber', validateTrackingNumber, shipment.delete);


export { shipmentRouter };
