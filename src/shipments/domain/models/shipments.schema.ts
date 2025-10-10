import { connection, model, Schema } from 'mongoose';
import { IShipment } from './interfaces/shipments';
import * as AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(connection);

const shipmentsSchema = new Schema<IShipment>({
  id: { type: Number, unique: true },
  orderId: { type: Number, required: true },
  status: { type: String, required: true },
  trackingId: { type: String, required: true, unique: true },
  carrier: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

shipmentsSchema.plugin(AutoIncrement, { inc_field: 'id' });

export const Shipment = model<IShipment>('Shipment', shipmentsSchema);
