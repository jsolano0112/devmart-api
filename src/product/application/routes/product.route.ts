import { Router } from 'express';
import { ProductController } from '../controller/product-controller';
import { validateSku } from '../../../shared/helpers/get-sku.validator';
import { validateCreateProduct } from '../middlewares/create-product.validator';
import { validateUpdateProduct } from '../middlewares/update-product.validator';

const controller = new ProductController();
const productRouter: Router = Router();

/**
 * @openapi
 * /products/{sku}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener producto por SKU
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '204':
 *         description: No content
 */

productRouter.get('/:sku', validateSku, controller.getBySku);

/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crear producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       '200':
 *         description: Creado correctamente
 */
productRouter.post('/', validateCreateProduct, controller.create);
productRouter.get('/', controller.getProducts);
productRouter.put('/:sku', validateUpdateProduct, controller.update);
productRouter.delete('/:sku', validateSku, controller.delete);

export { productRouter };
