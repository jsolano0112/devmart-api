import { Router } from 'express';
import { OrderController } from '../controller/orders-controller';
import { validateId } from '../../../helper/get-id.validator';
import { validateCreateOrder } from '../middlewares/create-order.validator';
import { validateUpdateOrder } from '../middlewares/update.order.validator';

const controller = new OrderController();
const orderRouter: Router = Router();

orderRouter.get('/:id', validateId, controller.getById);
orderRouter.post('/', validateCreateOrder, controller.create);
orderRouter.put('/', validateUpdateOrder, controller.update);
orderRouter.delete('/:id', validateId, controller.delete);

export { orderRouter };
