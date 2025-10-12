import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { ISupplier } from '../../../shared/interfaces/supplier';

export class GetSupplierByNIT {
  constructor(private repo: RepositoryContainer) {}

  async run(nit: string): Promise<ISupplier> {
    const supplier = await this.repo.suppliers.getSupplierByNIT(nit);

    if (!supplier) throw new Exception('Supplier not found.', 404);
    const { id, name, email, phone, address, city, country, isActive } =
      supplier;
    return {
      nit,
      id,
      name,
      email,
      phone,
      address,
      city,
      country,
      isActive,
    };
  }
}
