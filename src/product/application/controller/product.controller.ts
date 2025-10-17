import { Request, Response, NextFunction } from 'express';
import { ProductServiceContainer } from '../../infraestructure/product-service-container';
import { IProducParams, IProduct, IUpdateProduct } from '../../../shared/interfaces/products';

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
    request: Request<IProduct, void, IProduct>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await ProductServiceContainer.createProduct.run(request.body);
      return response.status(200).json('Product created successfully.');
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
      return response.status(200).json('Product updated successfully.');
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
      const page = parseInt(request.query.page as string) || 1;
      const limit = parseInt(request.query.limit as string) || 10;
      const search = (request.query.search as string) || '';

      const offset = (page - 1) * limit;

      const result  = await ProductServiceContainer.getProducts.run({
        limit,
        offset,
        search,
      });
      if (result.products.length === 0) {
        return response.status(204).json();
      }
      return response.status(200).json({
        data: result.products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.total / limit),
          totalItems: result.total,
        },
      });
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
      return response.status(200).json('Product deleted successfully.');
    } catch (error) {
      next(error);
    }
  }
}
