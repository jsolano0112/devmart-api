import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class GetProductsBySku {
  constructor(private repo: RepositoryContainer) {}

  async run(sku: string) {
    return this.repo.products.getProductBySku(sku);
  }
}
