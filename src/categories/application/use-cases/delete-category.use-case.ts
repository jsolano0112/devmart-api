import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";

export class DeleteCategory {
    constructor(private repo: RepositoryContainer) { }

    async run(id: number): Promise<void> {
        await this.repo.categories.deleteCategory(id);
    }
}