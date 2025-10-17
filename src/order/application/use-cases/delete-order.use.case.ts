import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { OrderStatus } from '../../../shared/interfaces/order-status';

export class DeleteOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(id: number): Promise<void> {
    const order = await this.repo.orders.getOrder(id);
    if (!order) throw new Exception('Order not found.', 404);

    if (
      ![OrderStatus.PENDIENTE, OrderStatus.RECHAZADO].includes(order.status)
    ) {
      throw new Exception(
        `Order in status "${order.status}" cannot be deleted.`,
        400,
      );
    }

    for (const item of order.products) {
      await this.repo.products.incrementStock(item.sku, item.count);
    }

    await this.repo.orders.deleteOrder(id);
  }
}
