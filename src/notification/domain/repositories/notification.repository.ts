import {
  INotification,
  INotificationResponse,
} from '../../../shared/interfaces/notifications';
import { NotificationSchema } from '../models/notification.schema';

export class NotificationRepository {
  public async getById(id: string): Promise<INotificationResponse> {
    try {
      const notification = await NotificationSchema.findById(id).lean();
      const { message, userId, type, createdAt, read } = notification;
      return {
        id,
        type,
        message,
        userId,
        createdAt,
        read,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getByUser(userId: number) {
    try {
      const notifications = await NotificationSchema.find({ userId }).lean();
      return notifications;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async create(notification: INotification) {
    try {
      const newOrder = new NotificationSchema(notification);
      await newOrder.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async update(id: string, notification: INotification) {
    try {
      await NotificationSchema.findByIdAndUpdate(
        id,
        { $set: notification },
        { new: true },
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async delete(id: string) {
    try {
      await NotificationSchema.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
