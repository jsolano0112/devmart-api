import { Request, Response, NextFunction } from "express";
import { ServiceContainer } from "../../infraestructure/user-service-container";

export class UserController {
  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const user = await ServiceContainer.user.getUserById.run(id);
      return response.status(200).json(user);
    } catch (error) {
      //TODO: middleware
      next(error);
    }
  }
}


