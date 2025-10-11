import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IProduct } from '../../../shared/interfaces/products';

export class GetProducts {
  constructor(private repo: RepositoryContainer) {}

  async run(): Promise<IProduct[]> {
    return this.repo.products.getAllProductsData();
  }
}
