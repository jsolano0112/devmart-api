import { statusCode404 } from '../../../shared/interfaces/general-response';
import {
  IOrder,
  IOrderResponse,
  IUserOrderResponse,
} from '../models/interfaces/orders';
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

  public async updateOrder(id: string, order: IOrder): Promise<void> {
    try {
      await OrderSchema.findByIdAndUpdate(id, { $set: order }, { new: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteOrder(id: string): Promise<void> {
    try {
      await OrderSchema.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getOrder(id: string): Promise<IOrderResponse> {
    try {
      const order = await OrderSchema.findById(id);
      if (!order) throw statusCode404;

      const { userId, products, paymentMethod, address, createdAt, updatedAt } =
        order;

      //TODO: take total from products

      const total = 0;
      return {
        id,
        userId,
        products,
        paymentMethod,
        address,
        createdAt,
        updatedAt,
        total,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getOrders(userId: string): Promise<IUserOrderResponse[]> {
    try {
      const orders = await OrderSchema.find({ userId }).lean();
      return orders.map((order) => {
        const count = order.products.reduce(
          (acc: number, p: { count: number }) => acc + p.count,
          0,
        );

      //TODO: take total from products
        const total = 0;

        return {
          id: order._id.toString(),
          userId: order.userId.toString(),
          count,
          total,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
