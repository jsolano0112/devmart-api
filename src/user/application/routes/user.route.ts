import { Router } from 'express';
import { UserController } from '../controller/users-controller';
import { validateUpdate } from '../middlewares/update-user.validator';
import { validateId } from '../../../helper/get-id.validator';
import { validateCreate } from '../middlewares/create-user.validator';
const controller = new UserController();
const userRouter: Router = Router();

userRouter.get('/:id', validateId, controller.getById);
userRouter.post('/', validateCreate, controller.create);
userRouter.put('/', validateUpdate, controller.update);
userRouter.get('/:id/orders', validateId, controller.getOrdersById);

export { userRouter };
