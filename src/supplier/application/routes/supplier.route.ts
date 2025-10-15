import { Router } from 'express';
import { SupplierController } from '../controller/supplier.controller';
import { verifyAuthToken } from '../../../shared/helpers/jwt-validator';
import { validateSupplier } from '../middlewares/create-or-update-supplier.validator';
import { validateIdNumberBody } from '../../../shared/helpers/get-id-number.validator';

const controller = new SupplierController();
const supplierRouter: Router = Router();

/**
 * @swagger
 * /suppliers/{nit}:
 *   get:
 *     summary: Get a supplier by NIT
 *     description: Retrieves supplier information based on the provided NIT.
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nit
 *         required: true
 *         schema:
 *           type: string
 *         example: "900123456-1"
 *     responses:
 *       200:
 *         description: Supplier retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nit: "900123456-1"
 *               name: "Acme S.A."
 *               email: "contact@acme.com"
 *               phone: "+57 3101234567"
 *               address: "Calle 45 #10-20"
 *               city: "Medellín"
 *               country: "Colombia"
 *               isActive: true
 *               createdAt: "2025-10-10T15:00:00Z"
 *               updatedAt: "2025-10-11T09:30:00Z"
 *       404:
 *         description: Supplier not found
 */
supplierRouter.get('/:nit', verifyAuthToken, controller.getByNIT);

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     description: Registers a new supplier in the system.
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               nit:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *             required: [name, email, nit]
 *             example:
 *               name: "TechWorld Ltda."
 *               email: "ventas@techworld.com"
 *               nit: "901234567-8"
 *               phone: "+57 3124567890"
 *               address: "Av. 80 #20-15"
 *               city: "Bogotá"
 *               country: "Colombia"
 *     responses:
 *       201:
 *         description: Supplier created successfully
 */
supplierRouter.post('/', validateSupplier, verifyAuthToken, controller.create);

/**
 * @swagger
 * /suppliers:
 *   put:
 *     summary: Update an existing supplier
 *     description: Updates all supplier information using the provided NIT to locate the record.
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Unique numeric identifier of the supplier.
 *                 example: 5
 *               nit:
 *                 type: string
 *                 description: Colombian tax identification number (format 999999999-9).
 *                 example: "901234567-8"
 *               name:
 *                 type: string
 *                 description: Supplier's legal name.
 *                 example: "TechWorld Ltda."
 *               email:
 *                 type: string
 *                 description: Contact email of the supplier.
 *                 example: "contacto@techworld.com"
 *               phone:
 *                 type: string
 *                 description: Supplier contact number.
 *                 example: "+57 3109998888"
 *               address:
 *                 type: string
 *                 description: Supplier address.
 *                 example: "Av. 80 #20-15"
 *               city:
 *                 type: string
 *                 description: City where the supplier is located.
 *                 example: "Bogotá"
 *               country:
 *                 type: string
 *                 description: Supplier's country.
 *                 example: "Colombia"
 *               isActive:
 *                 type: boolean
 *                 description: Indicates whether the supplier is active.
 *                 example: true
 *             required:
 *               - nit
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 */
supplierRouter.put(
  '/',
  validateSupplier,
  validateIdNumberBody,
  verifyAuthToken,
  controller.update,
);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     description: Deactivates or removes a supplier by its numeric ID.
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Supplier deleted successfully."
 *       404:
 *         description: Supplier not found
 */
supplierRouter.put('/:id', verifyAuthToken, controller.delete);

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     description: Retrieves the complete list of registered suppliers.
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of suppliers
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nit: "900123456-1"
 *                 name: "Acme S.A."
 *                 email: "contact@acme.com"
 *                 city: "Medellín"
 *                 isActive: true
 *               - id: 2
 *                 nit: "901234567-8"
 *                 name: "TechWorld Ltda."
 *                 email: "ventas@techworld.com"
 *                 city: "Bogotá"
 *                 isActive: true
 *       204:
 *         description: No suppliers found
 */
supplierRouter.get('/', verifyAuthToken, controller.getAll);

export { supplierRouter };
