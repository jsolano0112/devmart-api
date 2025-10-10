import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateCategory } from '../application/use-case/create-category.use-case';
import { GetCategories } from '../application/use-case/get-categories.use-case';
import { GetCategoryByName } from '../application/use-case/get-category-by-name.use-case';



const repositories = new RepositoryContainer();

export const CategoriesServiceContainer = {
  createCategory: new CreateCategory(repositories),
  getCategories: new GetCategories(repositories),
  getCategoryByName: new GetCategoryByName(repositories),
};
