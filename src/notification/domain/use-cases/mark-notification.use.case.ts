import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class MarkNotificationAsRead {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<void> {
    const notification = await this.repo.notifications.getById(id);
    if (!notification) throw new Error('Notification not found');
    notification.read = true;
    await this.repo.notifications.update(id, notification);
  }
}
