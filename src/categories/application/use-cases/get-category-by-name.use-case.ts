import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class GetCategoryByName {
  constructor(private repo: RepositoryContainer) {}

  async run(name: string) {
    return this.repo.categories.getCategoryByName(name);
  }
}
