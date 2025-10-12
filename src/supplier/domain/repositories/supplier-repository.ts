import { Exception } from '../../../shared/helpers/exception-message';
import { ISupplier } from '../../../shared/interfaces/supplier';
import { Supplier } from '../models/supplier.schema';

export class SupplierRepository {
  public async getSupplierByNIT(nit: string): Promise<ISupplier> {
    try {
      const supplier = await Supplier.findOne({ nit });

      return supplier;
    } catch (error) {
      throw error;
    }
  }

  public async getSupplierById(id: number): Promise<ISupplier> {
    try {
      const supplier = await Supplier.findOne(id);

      return supplier;
    } catch (error) {
      throw error;
    }
  }

  public async createSupplier(supplier: ISupplier): Promise<void> {
    try {
      const newUser = new Supplier(supplier);
      await newUser.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateSupplier(id: number, supplier: ISupplier): Promise<void> {
    try {
      await Supplier.findByIdAndUpdate(id, { $set: supplier }, { new: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async deleteSupplier(id: number): Promise<void> {
    try {
      await Supplier.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getAllSuppliers(): Promise<ISupplier[]> {
    try {
      const suppliers = await Supplier.find();
      if (suppliers.length === 0)
        throw new Exception('No suppliers found.', 404);
      return suppliers.map((c) => ({
        id: c.id,
        nit: c.nit,
        email: c.email,
        isActive: c.isActive,
        name: c.name,
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
