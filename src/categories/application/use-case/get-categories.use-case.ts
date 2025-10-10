import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { ICategories } from '../../dominio/models/interfaces/categories';

export class GetCategories {
  constructor(private repo: RepositoryContainer) {}

  async run(): Promise<ICategories[]> {
    return this.repo.categories.getAllCategoriesData();
  }
}
