import { OrderStatus } from '../../../shared/interfaces/order-status';
import { IOrder, IOrderResponse } from '../../../shared/interfaces/orders';
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

  public async updateOrder(id: number, order: IOrder): Promise<void> {
    try {
      await OrderSchema.findByIdAndUpdate(id, { $set: order }, { new: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteOrder(id: number): Promise<void> {
    try {
      await OrderSchema.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getOrder(id: number): Promise<IOrderResponse> {
    try {
      return await OrderSchema.findById(id);
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
