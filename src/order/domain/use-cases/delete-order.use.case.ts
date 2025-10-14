import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class DeleteOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(id: number): Promise<void> {
    const order = await this.repo.orders.getOrder(id);
    if(!order) throw new Exception('Order not found.', 404)
    await this.repo.orders.deleteOrder(id);
  }
}
