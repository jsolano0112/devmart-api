import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class getNotificationsByUser {
  constructor(private repo: RepositoryContainer) {}

  async run(userId: number) {
    await this.repo.users.getUserById(userId);
    const notifications = await this.repo.notifications.getByUser(userId);
    //return only 15
    return notifications.slice(0, 15);
  }
}
