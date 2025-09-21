import { IOrderResponse } from '../../../order/application/interfaces/orders';
import { orders } from '../../../shared/mock/orders.constants';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class GetUserOrders {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<IOrderResponse[]> {
    // const user = await this.repo.users.getUserById(id);
    return orders.filter((u) => u.userId === Number(id));
  }
}
