import { Request, Response, NextFunction } from 'express';
import { CategoriesServiceContainer } from '../../infraestructure/categories-service-container';
import { ICategories, ICategoriesParams, IUpdateCategory } from '../../../shared/interfaces/categories';

export class categoriesController {
  public async getAllCategories(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const categories = await CategoriesServiceContainer.getCategories.run();
      if (categories.length === 0) {
        return response.status(204).json();
      }
      return response.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  public async createCatrgory(
    request: Request<null, void, ICategories>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await CategoriesServiceContainer.createCategory.run(request.body);
      return response.status(200).json('Category created.');
    } catch (error) {
      next(error);
    }
  }

  public async getCategoryByName(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { name } = request.params;
      const category =
        await CategoriesServiceContainer.getCategoryByName.run(name);
      if (category === null) {
        return response.status(204).json();
      }
      return response.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

         public async updateCategory(
           request: Request<ICategoriesParams, void, IUpdateCategory>,
           response: Response,
            next: NextFunction,
          ) {
            try {
              const { id } = request.params;
              await CategoriesServiceContainer.updateCategory.run(request.body, id);
              return response.status(200).json();
            } catch (error) {
              next(error);
            }
          }
  
          public async deleteCategoryById(
            request: Request<ICategoriesParams>,
            response: Response,
            next: NextFunction,
          ) {
            try {
              const { id } = request.params;
              await CategoriesServiceContainer.deleteCategory.run(id);
              return response.status(200).json();
            } catch (error) {
              next(error);
            }
          }
}
