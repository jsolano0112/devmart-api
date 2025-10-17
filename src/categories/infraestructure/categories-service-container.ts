import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateCategory } from '../dominio/use-cases/create-category.use-case';
import { DeleteCategory } from '../dominio/use-cases/delete-category.use-case';
import { GetCategories } from '../dominio/use-cases/get-categories.use-case';
import { GetCategoryByName } from '../dominio/use-cases/get-category-by-name.use-case';
import { UpdateCategory } from '../dominio/use-cases/update-category.use-case';

const repositories = new RepositoryContainer();

export const CategoriesServiceContainer = {
  createCategory: new CreateCategory(repositories),
  getCategories: new GetCategories(repositories),
  getCategoryByName: new GetCategoryByName(repositories),
  deleteCategory: new DeleteCategory(repositories),
  updateCategory: new UpdateCategory(repositories),
};
