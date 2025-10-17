import { OrderStatus } from '../../../shared/interfaces/order-status';
import {
  IOrder,
  IOrderResponse,
  IUpdateOrder,
} from '../../../shared/interfaces/orders';
import { OrderSchema } from '../models/order.schema';

export class OrderRepository {
  public async createOrder(order: IOrder): Promise<void> {
    try {
      const newOrder = new OrderSchema(order);
      await newOrder.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateOrder(id: number, order: IUpdateOrder): Promise<void> {
    try {
      await OrderSchema.findOneAndUpdate(
        { id },
        { $set: order },
        { new: true },
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteOrder(id: number): Promise<void> {
    try {
      await OrderSchema.findOneAndDelete({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getOrder(id: number): Promise<IOrderResponse > {
    try {
      return await OrderSchema.findOne({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getOrders(userId: number) {
    try {
      return await OrderSchema.find({ userId }).lean();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getPendingOrdersBefore(date: Date) {
    return await OrderSchema.find({
      status: OrderStatus.PENDIENTE,
      createdAt: { $lte: date },
    }).lean();
  }
}
