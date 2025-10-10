import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { ICategories } from '../../dominio/models/interfaces/categories';
import { cateogoriesStatusCode409ExistingProduct } from '../../dominio/models/interfaces/categories.response';

export class CreateCategory {
  constructor(private repo: RepositoryContainer) {}

  async run(category: ICategories): Promise<void> {
    const existingProduct = await this.repo.categories.getCategoryByName(
      category.name,
    );
    if (existingProduct) throw cateogoriesStatusCode409ExistingProduct;
    this.repo.categories.createCategory(category);
  }
}
