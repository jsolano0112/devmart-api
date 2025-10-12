import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { CreateNotification } from '../domain/use-cases/create-notification.use.case';
import { getNotificationsByUser } from '../domain/use-cases/get-by-user.use.case';
import { MarkNotificationAsRead } from '../domain/use-cases/mark-notification.use.case';

const repositories = new RepositoryContainer();

export const NotificationServiceContainer = {
  getByUser: new getNotificationsByUser(repositories),
  create: new CreateNotification(repositories),
 markAsRead: new MarkNotificationAsRead(repositories)
};
