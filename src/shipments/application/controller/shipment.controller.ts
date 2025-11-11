import { Request, Response, NextFunction } from 'express';
import { ShipmentServiceContainer } from '../../infraestructure/shipment-service-container';
import {
  IShipment,
  IShipmentParams,
  IShipmentUpdate,
} from '../../../shared/interfaces/shipments';

export class ShipmentController {

  public async GetShipmentByTrackingId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { trackingNumber } = request.params;
      console.log('trackingNumber:', trackingNumber);
      const tracking =
        await ShipmentServiceContainer.getShipmentByTrackingId.run(trackingNumber);
      if (tracking === null) {
        return response.status(204).json();
      }
      return response.status(200).json(tracking);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<{}, void, IShipment>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const created = await ShipmentServiceContainer.createShipment.run(request.body);

      console.log('Resultado del servicio:', created);

      return response.status(200).json(created);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { trackingId } = request.params;
      await ShipmentServiceContainer.updateShipment.run(request.body, trackingId);
      return response.status(200).json('Shipment updated successfully.');
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


  public async delete(
    request: Request<IShipmentParams>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { trackingId } = request.params;
      await ShipmentServiceContainer.deleteShipment.run(trackingId);
      return response.status(200).json('Shipment deleted.');
    } catch (error) {
      next(error);
    }
  }
}
