import { Request, Response, NextFunction } from 'express';
import { ShipmentServiceContainer } from '../../infraestructure/shipment-service-container';
import { IShipment, IShipmentUpdate } from '../../domain/models/interfaces/shipments';
import { shipmentStatusCode200 } from '../../domain/models/interfaces/shipments-response';

export class ShipmentController {
  public async getByTrackingId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { trackingId } = request.params;
      const tracking = await ShipmentServiceContainer.getShipmentByTrackingId.run(trackingId);
      if (tracking === null) {
        return response.status(204).json();
      }
      return response.status(200).json(tracking);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<{}, {}, IShipment>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await ShipmentServiceContainer.createShipment.run(request.body);
      return response.status(200).json(shipmentStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request<null, void, IShipmentUpdate>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await ShipmentServiceContainer.updateShipment.run(request.body);
      return response.status(200).json(shipmentStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async getShipments(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const shipments = await ShipmentServiceContainer.getShipments.run();
      if (shipments.length === 0) {
        return response.status(204).json();
      }
      return response.status(200).json(shipments);
    } catch (error) {
      next(error);
    }
  }
}
