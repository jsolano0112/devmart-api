import { model, Schema } from 'mongoose';
import { IOrder, IProduct } from './interfaces/orders';

const productSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true },
    count: { type: Number, required: true },
    sellerId: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Number, required: true },
    products: { type: [productSchema], required: true },
    paymentMethod: { type: Number, required: false },
    address: { type: String, required: false },
  },
  { timestamps: true },
);

export const OrderSchema = model<IOrder>('Order', orderSchema);
