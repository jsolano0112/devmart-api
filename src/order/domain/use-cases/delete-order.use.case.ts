import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class DeleteOrder {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<void> {
    await this.repo.orders.getOrder(id);
    await this.repo.orders.deleteOrder(id);
  }
}
