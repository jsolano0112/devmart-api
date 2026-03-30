import { model, Schema, Types } from 'mongoose';
import { OrderStatus } from '../../../shared/interfaces/order-status';
import { IOrder, IProduct } from '../../../shared/interfaces/orders';


const productSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    products: { type: [productSchema], required: true },
    paymentMethod: { type: Number, required: false },
    address: { type: String, required: false },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDIENTE,
      required: true,
    },
  },
  { timestamps: true },
);


export const OrderSchema = model<IOrder>('Order', orderSchema);
