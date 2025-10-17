import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { ISupplier } from '../../../shared/interfaces/supplier';

export class UpdateSupplier {
  constructor(private repo: RepositoryContainer) {}

  async run(supplier: ISupplier, nit: string): Promise<ISupplier> {
    const dbSupplier = await this.repo.suppliers.getSupplierByNIT(nit);

    if (!dbSupplier) {
      throw new Exception('Supplier not found.', 404);
    }

    const supplierUpdated: ISupplier = {
      id: dbSupplier.id,
      nit: supplier.nit,
      name: supplier.name ?? dbSupplier.name,
      email: supplier.email ?? dbSupplier.email,
      phone: supplier.phone ?? dbSupplier.phone,
      address: supplier.address ?? dbSupplier.address,
      city: supplier.city ?? dbSupplier.city,
      country: supplier.country ?? dbSupplier.country,
      isActive:
        supplier.isActive !== undefined
          ? supplier.isActive
          : dbSupplier.isActive,
      createdAt: dbSupplier.createdAt,
      updatedAt: new Date(),
    };

    await this.repo.suppliers.updateSupplier(dbSupplier.id, supplierUpdated);

    return supplierUpdated;
  }
}
