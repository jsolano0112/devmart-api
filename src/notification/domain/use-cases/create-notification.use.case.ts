import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { INotification } from '../../../shared/interfaces/notifications';

export class CreateNotification {
  constructor(private repo: RepositoryContainer) {}

  async run(notification: INotification): Promise<void> {
    await this.repo.users.getUserById(notification.userId);
    await this.repo.notifications.create(notification);
  }
}
