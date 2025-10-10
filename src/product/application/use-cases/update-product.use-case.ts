import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { productStatusCode409ExistingProduct } from '../../domain/models/interfaces/product-response';
import {
  IProduct,
  IUpdateProduct,
} from '../../domain/models/interfaces/products';

export class updateProduct {
  constructor(private repo: RepositoryContainer) {}

  async run(product: IUpdateProduct): Promise<void> {
    const dbProduct = await this.repo.products.getProductBySku(product.sku);
    if (!dbProduct) throw productStatusCode409ExistingProduct;

    const productUpdated: IProduct = {
      name: product.name ? product.name : dbProduct.name,
      description: product.description
        ? product.description
        : dbProduct.description,
      price: product.price ? product.price : dbProduct.price,
      stock: product.stock ? product.stock : dbProduct.stock,
      images: product.images ? product.images : dbProduct.images,
      sku: product.sku ? product.sku : dbProduct.sku,
      category: product.category ? product.category : dbProduct.category,
    };
    await this.repo.products.updateProduct(product.sku, productUpdated);
  }
}
