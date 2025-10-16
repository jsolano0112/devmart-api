import { Request, Response, NextFunction } from 'express';
import { ShipmentServiceContainer } from '../../infraestructure/shipment-service-container';
import {
  IShipment,
  IShipmentParams,
  IShipmentUpdate,
} from '../../../shared/interfaces/shipments';

export class ShipmentController {

  public async getByTrackingId(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { trackingId } = request.params;
      const tracking =
        await ShipmentServiceContainer.getShipmentByTrackingId.run(trackingId);
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
      await ShipmentServiceContainer.createShipment.run(request.body);
      return response.status(200).json('Shipment created succesfully.');
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
      return response.status(200).json('Shipment updated succesfully.');
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
