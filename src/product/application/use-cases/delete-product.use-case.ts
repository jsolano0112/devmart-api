import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";

export class DeleteProduct {
  constructor(private repositories: RepositoryContainer) {}

  public async run(sku: string): Promise<void> {
    await this.repositories.products.deleteProduct(sku);
  }
}