import { Exception } from "../../../shared/helpers/exception-message";
import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { ISupplier } from "../../../shared/interfaces/suppliers";


export class CreateSupplier {
  constructor(private repo: RepositoryContainer) {}

  async run(supplier: ISupplier): Promise<void> {
    const existingSupplier = await this.repo.suppliers.getSupplierById(supplier.id);
    if (existingSupplier) throw new Exception('Supplier already exists.', 409);
    this.repo.suppliers.createSupplier(supplier);
  }
}
