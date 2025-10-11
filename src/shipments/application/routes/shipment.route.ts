import { Router } from 'express';
import { validateCreateShipment } from '../middlewares/create-shipment.validator';
import { validateUpdateShipment } from '../middlewares/update-shipment.validator';
import { validateTrackingNumber } from '../../../shared/helpers/trackingNumber-validator';
import { ShipmentController } from '../controller/shipment-controller';

const shipment = new ShipmentController();
const shipmentRouter: Router = Router();

shipmentRouter.get(
  '/:trackingNumber',
  validateTrackingNumber,
  shipment.getByTrackingId,
);
shipmentRouter.post('/', validateCreateShipment, shipment.create);
shipmentRouter.get('/', shipment.getShipments);
shipmentRouter.put('/:trackingNumber', validateUpdateShipment, shipment.update);

export { shipmentRouter };
