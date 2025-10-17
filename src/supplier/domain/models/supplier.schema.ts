import { connection, Schema, model } from 'mongoose';
// @ts-ignore
import AutoIncrementFactory from 'mongoose-sequence';
import { ISupplier } from '../../../shared/interfaces/supplier';

const AutoIncrement = AutoIncrementFactory(connection);

const SuppliersSchema = new Schema<ISupplier>({
  id: { type: Number, unique: true },
  nit: { type: String, unique: true },
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  country: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

SuppliersSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'supplier_id_counter',
});

export const Supplier =
  connection.models.Supplier || model<ISupplier>('Supplier', SuppliersSchema);
