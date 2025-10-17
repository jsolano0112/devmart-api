import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { Exception } from '../../../shared/helpers/exception-message';
import { OrderStatus } from '../../../shared/interfaces/order-status';

export class CancelOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(orderId: number): Promise<void> {
    const order = await this.repo.orders.getOrder(orderId);
    if (!order) throw new Exception('Order not found', 404);
    
    
    if (order.status !== OrderStatus.PENDIENTE) {
      throw new Exception('Only pending orders can be cancelled', 400);
    }

    for (const item of order.products) {
      await this.repo.products.incrementStock(item.sku, item.count);
    }

    order.status = OrderStatus.CANCELADO;
    //TODO: NOTIFICATION
    await this.repo.orders.updateOrder(orderId, order);
  }
}
