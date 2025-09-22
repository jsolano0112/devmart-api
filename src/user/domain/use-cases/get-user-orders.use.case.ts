import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IUserOrderResponse } from '../../../order/domain/models/interfaces/orders';

export class GetUserOrders {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<IUserOrderResponse[]> {
    await this.repo.users.getUserById(id);
    return this.repo.orders.getOrders(id);
  }
}
