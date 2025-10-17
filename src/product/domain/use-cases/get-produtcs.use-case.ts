import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IGetProductsPagination,IGetProductsResult,IProductResponse } from '../../../shared/interfaces/products';

export class GetProducts {
  constructor(private repo: RepositoryContainer) {}


  async run({ limit, offset, search = '' }: IGetProductsPagination): Promise<IGetProductsResult> {
    const [products, total] = await Promise.all([
      this.repo.products.getAllProductsData(limit, offset, search),
      this.repo.products.countProducts(search),
    ]);

    return { products, total };
  }
}
