import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";

export class DeleteSupplier {
  constructor(private repositories: RepositoryContainer) {}

  public async run(id: number): Promise<void> {
    await this.repositories.suppliers.deleteSupplier(id);
  }
}