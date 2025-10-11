import { Exception } from '../../../shared/helpers/exception-message';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { ICategories } from '../../../shared/interfaces/categories';

export class CreateCategory {
  constructor(private repo: RepositoryContainer) {}

  async run(category: ICategories): Promise<void> {
    const existingProduct = await this.repo.categories.getCategoryByName(
      category.name,
    );
    if (existingProduct)
      throw new Exception('The product already exists.', 409);
    this.repo.categories.createCategory(category);
  }
}
