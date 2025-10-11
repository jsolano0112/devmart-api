import { Router } from 'express';
import { validateCreateCategory } from '../middlewares/create-category.validator';
import { categoriesController } from '../controller/categories.controller';

const controller = new categoriesController();
const productRouter: Router = Router();

productRouter.get('/:name', controller.getCategoryByName);
productRouter.post('/', validateCreateCategory, controller.createCatrgory);
productRouter.get('/', controller.getAllCategories);

export { productRouter };
