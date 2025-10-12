import { Router } from 'express';
import { validateCreateCategory } from '../middlewares/create-category.validator';
import { categoriesController } from '../controller/categories.controller';

const controller = new categoriesController();
const categoryRouter: Router = Router();


/**
 * @swagger
 * /categories/{name}:
 *   get:
 *     summary: Get category by name
 *     description: Retrieve a specific product category by its name.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: "Laptops"
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Laptops"
 *       404:
 *         description: Category not found
 */
categoryRouter.get('/:name', controller.getCategoryByName);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Register a new product category in the system.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Smartphones"
 *     responses:
 *       200:
 *         description: Category created successfully
 */
categoryRouter.post('/', validateCreateCategory, controller.createCatrgory);


/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve the list of all product categories available in the system.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Laptops"
 *               - id: 2
 *                 name: "Smartphones"
 *               - id: 3
 *                 name: "Monitors"
 *       204:
 *         description: No categories found
 */
categoryRouter.get('/', controller.getAllCategories);

export { categoryRouter };
