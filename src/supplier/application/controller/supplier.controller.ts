import { Request, Response, NextFunction } from 'express';
import { SupplierServiceContainer } from '../../infraestructure/supplier-service-container';
import { ISupplier } from '../../../shared/interfaces/supplier';

export class SupplierController {
  public async getByNIT(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { nit } = request.params;
      const supplier = await SupplierServiceContainer.getSupplierByNIT.run(nit);
      return response.status(200).json(supplier);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const suppliers = await SupplierServiceContainer.getAllSuppliers.run();
      return response.status(200).json(suppliers);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<{}, {}, ISupplier>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await SupplierServiceContainer.createSupplier.run(request.body);
      return response.status(200).json('Supplier created.');
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request<{}, {}, ISupplier>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await SupplierServiceContainer.UpdateSupplier.run(request.body);
      return response.status(200).json('Supplier updated.');
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
      const { id } = request.params;
      await SupplierServiceContainer.deleteSupplier.run(Number(id));
      return response.status(200).json('Supplier deleted.');
    } catch (error) {
      next(error);
    }
  }
}
