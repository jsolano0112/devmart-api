import { Request, Response, NextFunction } from 'express';
import { ISupplier, ISupplierParams, IUpdateSupplier } from '../../../shared/interfaces/suppliers';
import { SupplierServiceContainer } from '../../infraestructure/supplier-service-container';
import { productStatusCode200 } from '../../../product/domain/models/interfaces/product-response';


export class SupplierController {
  public async getSupplierById(
    request: Request<ISupplierParams>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      const supplier = await SupplierServiceContainer.GetSupplierById.run(id);
      if (supplier === null) {
        return response.status(204).json();
      }
      return response.status(200).json(supplier);
    } catch (error) {
      next(error);
    }
  }

  public async createSupplier(
    request: Request<{}, {}, ISupplier>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await SupplierServiceContainer.CreateSupplier.run(request.body);
      return response.status(200).json(productStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async updateSupplier(
    request: Request<ISupplierParams, void, IUpdateSupplier>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      await SupplierServiceContainer.UpdateSupplier.run(request.body, id);
      return response.status(200).json(productStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async getSupplier(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const suppliers = await SupplierServiceContainer.GetSupplier.run();
      if (suppliers.length === 0) {
        return response.status(204).json();
      }
      return response.status(200).json(suppliers);
    } catch (error) {
      next(error);
    }
  }

  public async deleteSupplier(
    request: Request<ISupplierParams>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      await SupplierServiceContainer.DeleteSupplier.run(id);
      return response.status(200).json(productStatusCode200);
    } catch (error) {
      next(error);
    }
  }
}
