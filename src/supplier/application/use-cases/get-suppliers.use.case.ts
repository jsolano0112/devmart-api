import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { ISupplier } from '../../../shared/interfaces/supplier';

export class GetAllSuppliers {
  constructor(private repo: RepositoryContainer) {}

  async run(): Promise<ISupplier[]> {
    return await this.repo.suppliers.getAllSuppliers();
  }
}
