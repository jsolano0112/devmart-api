import { Request, Response, NextFunction } from "express";
import { ServiceContainer } from "../../infraestructure/user-service-container";
import { IUserRequest } from "../interfaces/users";
import { userStatusCode200, userUpdatedStatusCode200 } from "../interfaces/user-response";

export class UserController {
  public async getById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params;
      const user = await ServiceContainer.user.getUserById.run(id);
      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<{}, {}, IUserRequest>,
    response: Response,
    next: NextFunction
  ) {
    try {
      await ServiceContainer.user.createUser.run(request.body);
      return response.status(200).json(userStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request<{}, {}, IUserRequest>,
    response: Response,
    next: NextFunction
  ) {
    try {
      await ServiceContainer.user.updateUser.run(request.body);
      return response.status(200).json(userUpdatedStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async getOrdersById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params;
      const userOrders = await ServiceContainer.user.getUserOrders.run(id);
      if (userOrders.length === 0) {
        return response.status(204).json();
      }
      return response.status(200).json(userOrders);
    } catch (error) {
      next(error);
    }
  }
}
