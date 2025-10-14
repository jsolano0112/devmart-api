import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IUserOrderResponse } from '../../../shared/interfaces/orders';

export class GetUserOrders {
  constructor(private repo: RepositoryContainer) {}

  async run(userId: number): Promise<IUserOrderResponse[]> {
    try {
      const orders = await this.repo.orders.getOrders(userId);

      if (!orders || orders.length === 0) {
        throw new Exception('No orders found for this user.', 404);
      }

      const allProductSkus = orders.flatMap((order) =>
        order.products.map((p) => p.sku),
      );

      const products =
        await this.repo.products.getProductsBySkus(allProductSkus);

      const userOrders = orders.map((order) => {
        const count = order.products.reduce((acc, p) => acc + p.count, 0);

        const total = order.products.reduce((sum, p) => {
          const prod = products.find((prod) => prod.sku === p.sku);
          return prod ? sum + prod.price * p.count : sum;
        }, 0);

        return {
          id: order.id,
          userId: order.userId,
          count,
          total,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          status: order.status,
        };
      });

      return userOrders;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
