import { Router } from 'express';
import { validateSku } from '../../../shared/helpers/get-sku.validator';
import { validateProductInfo } from '../middlewares/product.validator';
import { ProductController } from '../controller/product.controller';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';

const controller = new ProductController();
const productRouter: Router = Router();

/**
 * @swagger
 * /api/v1/products/{sku}:
 *   get:
 *     summary: Get a product by SKU
 *     description: Retrieve a single product's details using its SKU.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b9e8f2c987654321"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               name: "Laptop ASUS VivoBook"
 *               description: "Powerful laptop for everyday work"
 *               price: 3800000
 *               stock: 25
 *               images: "https://example/products/example.jpg"
 *               sku: "64b9e8f2c987654321"
 *               supplierId: 1
 *               category: "Laptops"
 *       404:
 *         description: Product not found
 */
productRouter.get('/:sku', validateSku, controller.getBySku);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the inventory.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Monitor Samsung 24''"
 *             description: "Full HD LED display, 75Hz refresh rate"
 *             price: 780000
 *             stock: 40
 *             images: "https://example/products/example.jpg"
 *             sku: "64b9e8f2c987654321"
 *             supplierId: 2
 *             categoryId: 1
 *     responses:
 *       201:
 *         description: Product created successfully
 */
productRouter.post('/', validateProductInfo, verifyAuthToken, controller.create);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve the list of all products in the inventory.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             example:
 *               - name: "Laptop ASUS VivoBook"
 *                 description: "Powerful laptop for everyday work"
 *                 price: 3800000
 *                 stock: 25
 *                 images: "https://example/products/example.jpg"
 *                 sku: "64b9e8f2c987654321"
 *                 supplierId: 1
 *                 category: "Laptops"
 *               - name: "Mouse Logitech M170"
 *                 description: "Wireless optical mouse"
 *                 price: 75000
 *                 stock: 200
 *                 cimages: "https://example/products/example.jpg"
 *                 sku: "64b9e8f2c987654321"
 *                 supplierId: 3
 *                 category: "Accessories"
 *       204:
 *         description: No products found
 */
productRouter.get('/', controller.getProducts);

/**
 * @swagger
 * /api/v1/products/{sku}:
 *   put:
 *     summary: Update a product by SKU
 *     description: Update all product information based on its SKU.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         example: "ABC12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Laptop ASUS VivoBook Pro"
 *             description: "High-performance laptop with 16GB RAM"
 *             price: 4200000
 *             stock: 15
 *             images: "https://cdn.mystore.com/products/asus-vivobook-pro.jpg"
 *             supplierId: 1
 *             categoryId: 1
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 5
 *               name: "Laptop ASUS VivoBook Pro"
 *               description: "High-performance laptop with 16GB RAM"
 *               price: 4200000
 *               stock: 15
 *               images: "https://cdn.mystore.com/products/asus-vivobook-pro.jpg"
 *               sku: "64b9e8f2c987654321"
 *               supplierId: 1
 *               categoryId: 1
 *       404:
 *         description: Product not found
 */
productRouter.put('/:sku', validateProductInfo,verifyAuthToken, controller.update);

/**
 * @swagger
 * /api/v1/products/{sku}:
 *   delete:
 *     summary: Delete a product by SKU
 *     description: Remove a product from the inventory using its SKU.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         example: "64b9e8f2c987654321"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product deleted successfully."
 *       404:
 *         description: Product not found
 */
productRouter.delete('/:sku', validateSku,verifyAuthToken, controller.delete);

export { productRouter };
