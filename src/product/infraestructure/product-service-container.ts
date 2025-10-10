import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateProduct } from '../application/use-cases/create-product.use-case';
import { DeleteProduct } from '../application/use-cases/delete-product.use-case';
import { GetProductsBySku } from '../application/use-cases/get-product-by-sku.use.case';
import { GetProducts } from '../application/use-cases/get-produtcs.use-case';
import { updateProduct } from '../application/use-cases/update-product.use-case';


const repositories = new RepositoryContainer();

export const ProductServiceContainer = {
  createProduct: new CreateProduct(repositories),
  getProducts: new GetProducts(repositories),
  updateProduct: new updateProduct(repositories),
  getProductBySku: new GetProductsBySku(repositories),
  deleteProduct: new DeleteProduct(repositories),
};
