import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IOrder, IUpdateOrder } from '../../../shared/interfaces/orders';

export class UpdateOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(order: IUpdateOrder, id: number): Promise<void> {
    const dbOrder = await this.repo.orders.getOrder(id);

    const orderUpdated: IUpdateOrder = {
      products: order.products ? order.products : dbOrder.products,
      paymentMethod: order.paymentMethod ? order.paymentMethod : dbOrder.paymentMethod,
      address: order.address ? order.address : dbOrder.address,
      status: order.status ? order.status : dbOrder.status

    };
    await this.repo.orders.updateOrder(id, orderUpdated);
  }
}
