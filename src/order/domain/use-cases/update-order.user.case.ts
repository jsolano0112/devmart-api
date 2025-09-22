import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IOrder, IUpdateOrder } from '../models/interfaces/orders';

export class UpdateOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(order: IUpdateOrder): Promise<void> {
    const dbOrder = await this.repo.orders.getOrder(order.id);

    const orderUpdated: IOrder = {
      userId: dbOrder.userId,
      products: order.products,
      paymentMethod: order.paymentMethod,
      address: order.address,
    };
    await this.repo.orders.updateOrder(order.id, orderUpdated);
  }
}
