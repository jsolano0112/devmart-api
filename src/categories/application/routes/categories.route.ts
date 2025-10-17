import { Router } from 'express';
import { validateCreateCategory } from '../middlewares/create-category.validator';
import { CategoriesController } from '../controller/categories.controller';

const controller = new CategoriesController();
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
categoryRouter.post('/', validateCreateCategory, controller.createCategory);

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
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Laptops"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-17T15:32:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-17T15:32:00Z"
 *             example:
 *               - id: 1
 *                 name: "Laptops"
 *                 createdAt: "2025-10-17T15:32:00Z"
 *                 updatedAt: "2025-10-17T15:32:00Z"
 *               - id: 2
 *                 name: "Smartphones"
 *                 createdAt: "2025-10-17T15:32:00Z"
 *                 updatedAt: "2025-10-17T15:32:00Z"
 *               - id: 3
 *                 name: "Monitors"
 *                 createdAt: "2025-10-17T15:32:00Z"
 *                 updatedAt: "2025-10-17T15:32:00Z"
 *       204:
 *         description: No categories found
 */
categoryRouter.get('/', controller.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update an existing product category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Smartphones"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Category updated."
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Category not found
 */
categoryRouter.put('/:id', controller.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a product category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Category deleted."
 *       404:
 *         description: Category not found
 */
categoryRouter.delete('/:id', controller.deleteCategoryById);

export { categoryRouter };
