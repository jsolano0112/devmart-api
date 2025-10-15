import { Router } from 'express';
import { SupplierController } from '../controller/supplier-controller';
import { validateIdCollection } from '../../../shared/helpers/idColletion-Validator';
import { validateCreateSupplier } from '../middlewares/create-supplier.validator';

const controller = new SupplierController();
const supplierRouter: Router = Router();

supplierRouter.get('/:id', validateIdCollection, controller.getSupplierById);
supplierRouter.post('/', validateCreateSupplier, controller.createSupplier);
supplierRouter.get('/', controller.getSupplier);
supplierRouter.put('/:id', validateIdCollection, controller.updateSupplier);
supplierRouter.delete('/:id', validateIdCollection, controller.deleteSupplier);

export { supplierRouter };
