import { Router } from "express";
import { UserController } from "../controller/users-controller";
import { validateUpdate } from "../middlewares/update-user.validator";
import { validateUserId } from "../middlewares/user-id.validator";
const { validateCreate } = require("../middlewares/create-user.validator");
const controller = new UserController();
const userRouter: Router = Router();

userRouter.get("/:id", validateUserId, controller.getById);
userRouter.post("/", validateCreate, controller.create);
userRouter.put("/", validateUpdate, controller.update);
userRouter.get("/:id/orders", validateUserId, controller.getOrdersById);

export { userRouter };
