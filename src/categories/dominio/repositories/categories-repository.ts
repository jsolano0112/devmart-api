import { ICategories, IUpdateCategory } from '../models/interfaces/categories';
import { Category } from '../models/categories.schema';
import { Exception } from '../../../shared/helpers/exception-message';


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

    public async getCategoryById(id: number): Promise<ICategories> {
        try {
            const category = await Category.findById(id);
            if (category === null) throw new Exception('Category not found.', 404);
            const {
                name
            } = category;
            return {
                id,
                name
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
                name: c.name
            }));
        } catch (error) {
            throw error;
        }
    }

      public async updateCategory(id: number, category: IUpdateCategory): Promise<void> {
        try {
          await Category.findByIdAndUpdate(id, { $set: category }, { new: true });
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

        public async deleteCategoryById(id: number): Promise<void> {
          try {
              await Category.findByIdAndDelete(id);
          } catch (error) {
              console.error(error);
              throw error;
          }
      }
    }