import { ICategories } from '../models/interfaces/categories';
import { Category } from '../models/categories.schema';
import { statusCode404 } from '../../../shared/interfaces/general-response';

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
            if (category === null) throw statusCode404;
            const {
                id } = category;
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
            if (categories.length === 0) throw statusCode404;
            return categories.map((c) => ({
                id: c.id,
                name: c.name
            }));
        } catch (error) {
            throw error;
        }
    }
}