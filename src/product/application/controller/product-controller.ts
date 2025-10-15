import { Request, Response, NextFunction } from 'express';
import { ProductServiceContainer} from '../../infraestructure/product-service-container';
import { IProduct, IUpdateProduct, IProducParams } from '../../domain/models/interfaces/products';
import { productStatusCode200 } from '../../domain/models/interfaces/product-response';

export class ProductController {
  public async getBySku(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { sku } = request.params;
      const product = await ProductServiceContainer.getProductBySku.run(sku);
      if (product === null) {
        return response.status(204).json();
      }
      return response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<{}, {}, IProduct>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await ProductServiceContainer.createProduct.run(request.body);
      return response.status(200).json(productStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request<IProducParams, void, IUpdateProduct>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { sku } = request.params;
      await ProductServiceContainer.updateProduct.run(request.body, sku);
      return response.status(200).json(productStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async getProducts(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const products = await ProductServiceContainer.getProducts.run();
      if (products.length === 0) {
        return response.status(204).json();
      }
      return response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { sku } = request.params;
      await ProductServiceContainer.deleteProduct.run(sku);
      return response.status(200).json(productStatusCode200);
    } catch (error) {
      next(error);
    }
  }
}
