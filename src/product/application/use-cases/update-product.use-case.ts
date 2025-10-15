import { Exception } from "../../../shared/helpers/exception-message";
import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { IUpdateProduct } from "../../domain/models/interfaces/products";

export class updateProduct {
    constructor(private repo: RepositoryContainer) { }

    async run(product: IUpdateProduct,  sku: string): Promise<void> {
        const dbProduct = await this.repo.products.getProductBySku(sku);
        if (!dbProduct) throw new Exception('The product does not exist.', 404);

        const productUpdated: IUpdateProduct = {
          name: product.name ? product.name : dbProduct.name,
          description: product.description ? product.description : dbProduct.description,
          price: product.price ? product.price : dbProduct.price,
          stock: product.stock ? product.stock : dbProduct.stock,
          images: product.images ? product.images : dbProduct.images,
          category: product.category ? product.category : dbProduct.category,
        };
        await this.repo.products.updateProduct(sku, productUpdated);
    }
}