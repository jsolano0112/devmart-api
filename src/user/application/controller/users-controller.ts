import { Request, Response, NextFunction } from 'express';
import { UserServiceContainer } from '../../infraestructure/user-service-container';
import {
  userStatusCode200,
  userUpdatedStatusCode200,
} from '../../domain/models/interfaces/user-response';
import { IUpdateUser, IUser } from '../../domain/models/interfaces/users';

export class UserController {
  public async getById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      const user = await UserServiceContainer.getUserById.run(id);
      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<{}, {}, IUser>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await UserServiceContainer.createUser.run(request.body);
      return response.status(200).json(userStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request<null, void, IUpdateUser>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await UserServiceContainer.updateUser.run(request.body);
      return response.status(200).json(userUpdatedStatusCode200);
    } catch (error) {
      next(error);
    }
  }

  public async getOrdersById(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      const userOrders = await UserServiceContainer.getUserOrders.run(id);
      if (userOrders.length === 0) {
        return response.status(204).json();
      }
      return response.status(200).json(userOrders);
    } catch (error) {
      next(error);
    }
  }
}
