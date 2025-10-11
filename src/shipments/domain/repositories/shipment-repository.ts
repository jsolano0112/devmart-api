import {
  IShipment,
  IShipmentsResponse,
  IShipmentUpdate,
} from '../../../shared/interfaces/shipments';
import { Shipment } from '../models/shipments.schema';
import { generateUniqueTrackingNumber } from '../../../shared/helpers/generate-tracking.helper';
import { Exception } from '../../../shared/helpers/exception-message';

export class ShipmentRepository {
  public async getShipmentBytrackingId(
    trackingId: string,
  ): Promise<IShipmentsResponse> {
    try {
      const shipment = await Shipment.findOne({ trackingId });

      if (!shipment) throw new Exception('Shipment not found.', 404);
      const { id, orderId, status, carrier, createdAt, updatedAt } = shipment;
      return {
        id,
        orderId,
        status,
        trackingId,
        carrier,
        createdAt,
        updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getAllShipmentsData(): Promise<IShipmentsResponse[]> {
    try {
      const shipments = await Shipment.find();
      if (shipments.length === 0)
        throw new Exception('No shipments found.', 404);

      return shipments.map((s) => ({
        id: s.id,
        orderId: s.orderId,
        status: s.status,
        trackingId: s.trackingId,
        carrier: s.carrier,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      }));
    } catch (error) {
      throw error;
    }
  }

  public async createShipment(shipment: IShipmentsResponse): Promise<void> {
    try {
      // Ensure trackingNumber exists and is unique. If not provided, generate one.
      if (!shipment.trackingId) {
        shipment.trackingId = await generateUniqueTrackingNumber(Shipment);
      }

      const newShipment = new Shipment(shipment);
      try {
        await newShipment.save();
      } catch (err: any) {
        // Handle potential duplicate key on trackingNumber: try regenerating a few times
        if (
          err &&
          err.code === 11000 &&
          err.keyPattern &&
          err.keyPattern.trackingNumber
        ) {
          // attempt limited retries
          const maxRetries = 5;
          let saved = false;
          for (let i = 0; i < maxRetries && !saved; i++) {
            shipment.trackingId = await generateUniqueTrackingNumber(Shipment);
            newShipment.trackingId = shipment.trackingId;
            try {
              await newShipment.save();
              saved = true;
            } catch (e: any) {
              // continue retrying on duplicate key, otherwise throw
              if (
                !(
                  e &&
                  e.code === 11000 &&
                  e.keyPattern &&
                  e.keyPattern.trackingNumber
                )
              )
                throw e;
            }
          }
          if (!saved)
            throw new Error(
              'Failed to save shipment: trackingNumber collisions',
            );
        } else {
          throw err;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateShipment(
    trackingId: string,
    shipment: IShipmentUpdate,
  ): Promise<void> {
    try {
      const updatedShipment = await Shipment.findOneAndUpdate(
        { trackingId },
        { status: shipment.status, updatedAt: new Date() },
        { new: true },
      );
      if (!updatedShipment) throw new Exception('Shipment not found.', 404);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
