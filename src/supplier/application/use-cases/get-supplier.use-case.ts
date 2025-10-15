import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { ISupplier } from "../../../shared/interfaces/suppliers";

export class GetSupplier {
  constructor(private repo: RepositoryContainer) {}

    async run(): Promise<ISupplier[]> {
      return this.repo.suppliers.getAllSuppliers();
    }
}