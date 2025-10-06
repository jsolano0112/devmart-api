export interface INotification {
  type: string;
  message: string;
  userId: string;
  createdAt: Date;
}

export interface INotificationResponse {
  id: string;
  type: string;
  message: string;
  userId: string;
  createdAt: Date;
}
