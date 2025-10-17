import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class DeleteSupplier {
  constructor(private repo: RepositoryContainer) {}

  async run(supplierId: number): Promise<void> {
    await this.repo.suppliers.deleteSupplier(supplierId);
  }
}
