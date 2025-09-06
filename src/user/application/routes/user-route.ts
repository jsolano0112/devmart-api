import { Router } from "express";
import { UserController } from "../controller/users-controller";

const controller = new UserController();
const userRouter: Router = Router();

userRouter.get("/:id", controller.getById);
// userRouter.post("/users/", controller.create);
// userRouter.put("/users/:id/", controller.update);
// userRouter.get("/users/:id/orders", controller.getOrdersById);

export { userRouter };