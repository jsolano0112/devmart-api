export interface INotification {
  type: string;
  message: string;
  userId: string;
  createdAt: Date;
  read: boolean;
}

export interface INotificationResponse {
  id: string;
  type: string;
  message: string;
  userId: string;
  createdAt: Date;
  read: boolean;
}
