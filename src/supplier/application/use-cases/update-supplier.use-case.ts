import { Exception } from "../../../shared/helpers/exception-message";
import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { IUpdateSupplier } from "../../../shared/interfaces/suppliers";

export class UpdateSupplier {
    constructor(private repo: RepositoryContainer) { }

    async run(supplier: IUpdateSupplier, id: number): Promise<void> {
        const dbSupplier = await this.repo.suppliers.getSupplierById(id);
        if (!dbSupplier) throw new Exception('The supplier does not exist.', 404);

        const supplierUpdated: IUpdateSupplier = {
          name: supplier.name ? supplier.name : dbSupplier.name,
          contactEmail: supplier.contactEmail ? supplier.contactEmail : dbSupplier.contactEmail,
          phoneNumber: supplier.phoneNumber ? supplier.phoneNumber : dbSupplier.phoneNumber,
          address: supplier.address ? supplier.address : dbSupplier.address,
          city: supplier.city ? supplier.city : dbSupplier.city,
          country: supplier.country ? supplier.country : dbSupplier.country,
        };
        await this.repo.suppliers.updateSupplier(id, supplierUpdated);
    }
}
