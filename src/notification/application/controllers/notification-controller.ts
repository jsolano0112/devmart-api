import { Request, Response, NextFunction } from 'express';
import { NotificationServiceContainer } from '../../infraestructure/notification-service-container';
import { INotification } from '../../domain/models/interfaces/notifications';
import {
  notificationCreatedStatus,
  notificationDeletedStatus,
} from '../../domain/models/interfaces/notification-response';

export class NotificationController {
  public async getByUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      const notifications =
        await NotificationServiceContainer.getByUser.run(id);
      return response.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request<{}, {}, INotification>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await NotificationServiceContainer.create.run(request.body);
      return response.status(200).json(notificationCreatedStatus);
    } catch (error) {
      next(error);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = request.params;
      await NotificationServiceContainer.delete.run(id);
      return response.status(200).json(notificationDeletedStatus);
    } catch (error) {
      next(error);
    }
  }
}
