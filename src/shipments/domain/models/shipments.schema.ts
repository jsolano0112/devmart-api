import { connection, Schema, model } from 'mongoose';
// @ts-ignore
import AutoIncrementFactory from 'mongoose-sequence';
import { IShipment } from '../../../shared/interfaces/shipments';

const AutoIncrement = require('mongoose-sequence')(connection);

const ShipmentsSchema = new Schema<IShipment>({
  id: { type: Number, unique: true },
  orderId: { type: Number, required: true },
  status: { type: String, required: true },
  trackingId: { type: String, required: true, unique: true },
  carrier: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ShipmentsSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'shipment_id_counter',
});

export const Shipment =
  connection.models.Shipment || model<IShipment>('Shipment', ShipmentsSchema);
