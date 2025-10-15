import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";

export class GetSupplierById {
    constructor(private repo: RepositoryContainer) { }

    async run(id: number) {
        return this.repo.suppliers.getSupplierById(id);
    }
}