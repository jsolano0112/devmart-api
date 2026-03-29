import { connection, Schema, model } from 'mongoose';
import { ISupplier } from '../../../shared/interfaces/supplier';


const SuppliersSchema = new Schema<ISupplier>({
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

export const Supplier =
  connection.models.Supplier || model<ISupplier>('Supplier', SuppliersSchema);
