import { model, Schema } from 'mongoose';
import { INotification } from './interfaces/notifications';

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: false },
  },
  { timestamps: true },
);
export const NotificationSchema = model<INotification>(
  'Notification',
  notificationSchema,
);
