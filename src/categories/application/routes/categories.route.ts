import { Router } from "express";
import { ProductController } from "../../../product/application/controller/product-controller";
import { validateCreateCategory } from "../middlewares/create-category.validator";
import { categoriesController } from "../controller/categories-controller";


const controller = new categoriesController();
const categoriesRouter: Router = Router();

categoriesRouter.get('/:name', controller.getCategoryByName);
categoriesRouter.post('/', validateCreateCategory, controller.createCatrgory);
categoriesRouter.get('/', controller.getAllCategories);
categoriesRouter.put('/:id', controller.updateCategory);
categoriesRouter.delete('/:id', controller.deleteCategoryById);

export { categoriesRouter };
