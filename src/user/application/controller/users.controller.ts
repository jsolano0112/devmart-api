import { Request, Response, NextFunction } from 'express';
import { UserServiceContainer } from '../../infraestructure/user-service-container';
import {
  IUpdateUser,
  IUser,
  IUserCredentials,
} from '../../../shared/interfaces/users';

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
    const {
      firstName,
      lastName,
      email,
      address,
      mobilePhone,
      city,
      zipCode,
      isActive,
      password,
      isAdmin,
    } = request.body;

    try {
      const user: IUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        mobilePhone: mobilePhone,
        city: city,
        zipCode: zipCode,
        isActive: isActive,
        password: password,
        isAdmin: isAdmin,
      };
      await UserServiceContainer.createUser.run(user);
      return response.status(200).json('User created.');
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
      return response.status(200).json('User updated.');
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

  public async auth(
    request: Request<{}, {}, IUserCredentials>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const credentials = await UserServiceContainer.authenticateUser.run(
        request.body,
      );
      return response.status(200).json(credentials);
    } catch (error) {
      next(error);
    }
  }

  public async refresh(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const credentials = await UserServiceContainer.refreshToken.run(
        request.body,
      );
      return response.status(200).json(credentials);
    } catch (error) {
      next(error);
    }
  }
}
