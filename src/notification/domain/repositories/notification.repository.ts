import { INotification } from '../../../shared/interfaces/notifications';
import { NotificationSchema } from '../models/notification.schema';

export class NotificationRepository {
  public async getByUser(userId: string) {
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

  public async delete(id: string) {
    try {
      await NotificationSchema.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
