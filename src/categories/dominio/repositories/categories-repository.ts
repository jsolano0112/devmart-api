import { ICategories, ICategoriesResponse, IUpdateCategory } from '../../../shared/interfaces/categories';
import { Category } from '../models/categories.schema';
import { Exception } from '../../../shared/helpers/exception-message';
import { create } from 'domain';

export class CategoriesRepository {
  public async createCategory(category: ICategories): Promise<void> {
    try {
      const newCategory = new Category(category);
      await newCategory.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

    public async getCategoryByName(name: string): Promise<ICategories> {
        try {
            const category = await Category.findOne({ name });
            if (category === null) throw new Exception('Category not found.', 404);
            const { id, createdAt, updatedAt } = category;
            return {
                id,
                name,
                createdAt,
                updatedAt
            };
        } catch (error) {
            console.error(error);
            throw error;
        }


    }

    public async getAllCategoriesData(): Promise<ICategories[]> {
        try {
            const categories = await Category.find();
            if (categories.length === 0) throw new Exception('No categories found.', 404);
            return categories.map((c) => ({
                id: c.id,
                name: c.name,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
            }));
        } catch (error) {
            throw error;
        }
    }

    public async getCategoryById(id: number): Promise<ICategoriesResponse> {
        try {
            const category = await Category.findById(id);
            if (!category) throw new Exception('Category not found.', 404);
            return {
                id: category.id,
                name: category.name,
                updatedAt: category.updatedAt,
            };
        } catch (error) {
            throw error;
        }
    }

    public async updateCategory(id: number, category: IUpdateCategory): Promise<void> {
        try {
            await Category.findByIdAndUpdate(id, category);
        } catch (error) {
            throw error;
        }
    }

    public async deleteCategory(id: number): Promise<void> {
        try {
            const result = await Category.findOneAndDelete({id});
            if (!result) throw new Exception('Category not found.', 404);
        } catch (error) {
            throw error;
        }
    }
}