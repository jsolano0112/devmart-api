import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IOrder } from '../models/interfaces/orders';

export class CreateOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(order: IOrder): Promise<void> {
    await this.repo.users.getUserById(order.userId);
    await this.repo.orders.createOrder(order);
  }
}
