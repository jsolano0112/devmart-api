import { Product } from '../../../product/domain/models/product.schema';
import { Exception } from '../../../shared/helpers/exception-message';
import {
  IOrder,
  IOrderResponse,
  IUserOrderResponse,
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
      if (!order) throw new Exception('Order not found.', 404);

      const { userId, products, paymentMethod, address, createdAt, updatedAt } =
        order;

      let total = 0;
      for (const item of products) {
        const product = await Product.findById(item.id);
        if (product) {
          total += product.price * item.count;
        }
      }

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

  public async getOrders(userId: number): Promise<IUserOrderResponse[]> {
    try {
      const orders = await OrderSchema.find({ userId }).lean();
      const allProductIds = orders.flatMap((o) => o.products.map((p) => p.id));

      // Search Products
      const products = await Product.find({
        _id: { $in: allProductIds },
      }).lean();

      // Mapping
      return orders.map((order) => {
        const count = order.products.reduce(
          (acc: number, p: { count: number }) => acc + p.count,
          0,
        );

        const total = order.products.reduce(
          (sum: number, p: { id: string; count: number }) => {
            const product = products.find(
              (prod) => prod._id.toString() === p.id,
            );
            return product ? sum + product.price * p.count : sum;
          },
          0,
        );

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
