import { Router } from "express";
import { NotificationController } from "../controllers/notification-controller";
import { validateId } from "../../../shared/helpers/get-id.validator";
import { validateCreateNotification } from "../middlewares/create-notification.validator";

const controller = new NotificationController();
const notificationRouter: Router = Router();

notificationRouter.get('/getByUser/:id', validateId, controller.getByUser);
notificationRouter.post('/', validateCreateNotification, controller.create);
notificationRouter.delete('/:id', validateId, controller.delete);

export { notificationRouter };
