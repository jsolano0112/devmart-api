import { Exception } from "../../../shared/helpers/exception-message";
import { RepositoryContainer } from "../../../shared/infraestructure/respository-container";
import { IUpdateCategory } from "../../dominio/models/interfaces/categories";

export class UpdateCategory {
    constructor(private repo: RepositoryContainer) { }

    async run(category: IUpdateCategory, id: number): Promise<void> {
        const dbCategory = await this.repo.categories.getCategoryById(id);
        if (!dbCategory) throw new Exception('The category does not exist.', 404);

        const categoryUpdated: IUpdateCategory = {
          name: category.name ? category.name : dbCategory.name,
        };
        await this.repo.categories.updateCategory(id, categoryUpdated);

    }
}