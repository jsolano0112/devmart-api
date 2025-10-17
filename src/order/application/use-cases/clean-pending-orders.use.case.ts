import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { OrderStatus } from '../../../shared/interfaces/order-status';

export class CleanPendingOrders {
  constructor(private repo: RepositoryContainer) {}

  async run(): Promise<void> {
    const now = new Date();
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const oldOrders =
      await this.repo.orders.getPendingOrdersBefore(fortyEightHoursAgo);

    for (const order of oldOrders) {
      for (const item of order.products) {
        await this.repo.products.incrementStock(item.sku, item.count);
      }

      order.status = OrderStatus.CANCELADO;
      await this.repo.orders.updateOrder(order.id, order);
    }
  }
}
