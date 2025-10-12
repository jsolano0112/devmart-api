import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IProduct } from '../../../shared/interfaces/products';

export class CreateProduct {
  constructor(private repo: RepositoryContainer) {}

  async run(product: IProduct): Promise<void> {
    const existingProduct = await this.repo.products.getProductBySku(
      product.sku,
    );
    if (existingProduct)
      throw new Exception('The product already exists.', 409);

    const existingSupplier = await this.repo.suppliers.getSupplierById(
      existingProduct.supplierId,
    );
    if (!existingSupplier) throw new Exception('The supplier not found.', 404);
    this.repo.products.createProduct(product);
  }
}
