import { connection, model, Schema } from 'mongoose';
import { IOrder, IProduct } from '../../../shared/interfaces/orders';
import { OrderStatus } from '../../../shared/interfaces/order-status';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(connection);

const productSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    id: { type: Number, unique: true },
    userId: { type: Number, required: true },
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

orderSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'order_id_counter',
});
export const OrderSchema = model<IOrder>('Order', orderSchema);
