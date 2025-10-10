import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { productStatusCode409ExistingProduct} from "../../domain/models/interfaces/product-response";
import { IProduct } from "../../domain/models/interfaces/products";

export class CreateProduct {
  constructor(private repo: RepositoryContainer) {}

  async run(product: IProduct): Promise<void> {
    const existingProduct = await this.repo.products.getProductBySku(product.sku);
    if (existingProduct) throw productStatusCode409ExistingProduct;
    this.repo.products.createProduct(product);
  }
}
