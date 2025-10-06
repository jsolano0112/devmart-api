import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IOrderResponse } from '../../../shared/interfaces/orders';

export class GetOrderById {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<IOrderResponse> {
    return await this.repo.orders.getOrder(id);
  }
}
