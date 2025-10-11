import { Router } from 'express';
import { ProductController } from '../controller/product.controller';
import { validateSku } from '../../../shared/helpers/get-sku.validator';
import { validateCreateProduct } from '../middlewares/create-product.validator';
import { validateUpdateProduct } from '../middlewares/update-product.validator';

const controller = new ProductController();
const productRouter: Router = Router();

productRouter.get('/:sku', validateSku, controller.getBySku);
productRouter.post('/', validateCreateProduct, controller.create);
productRouter.get('/', controller.getProducts);
productRouter.put('/:sku', validateUpdateProduct, controller.update);
productRouter.delete('/:sku', validateSku, controller.delete);

export { productRouter };
