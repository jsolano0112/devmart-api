import { connection, Schema, model } from 'mongoose';
import { IShipment } from '../../../shared/interfaces/shipments';

const ShipmentsSchema = new Schema<IShipment>({
  orderId: { type: Number, required: true },
  status: { type: String, required: true },
  trackingId: { type: String, required: true, unique: true },
  carrier: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Shipment =
  connection.models.Shipment || model<IShipment>('Shipment', ShipmentsSchema);
