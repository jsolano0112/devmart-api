import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateCategory } from '../application/use-cases/create-category.use-case';
import { GetCategories } from '../application/use-cases/get-categories.use-case';
import { GetCategoryByName } from '../application/use-cases/get-category-by-name.use-case';

const repositories = new RepositoryContainer();

export const CategoriesServiceContainer = {
  createCategory: new CreateCategory(repositories),
  getCategories: new GetCategories(repositories),
  getCategoryByName: new GetCategoryByName(repositories),
};
