import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class GetProductsBySku {
  constructor(private repo: RepositoryContainer) {}

  async run(sku: string) {
    const product = await this.repo.products.getProductBySku(sku);
    if (!product) throw new Exception('Product not found.', 404);
    if (product.stock === 0) {
      throw new Exception('Product out of stock.', 404);
    }
    const { name, description, price, stock, images, categoryId, supplierId } =
      product;
    return {
      supplierId,
      name,
      description,
      price,
      stock,
      images,
      sku,
      categoryId,
    };
  }
}
