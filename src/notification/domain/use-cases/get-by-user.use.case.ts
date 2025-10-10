import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class getNotificationsByUser {
  constructor(private repo: RepositoryContainer) {}

  async run(userId: string) {
    await this.repo.users.getUserById(userId);
    return await this.repo.notifications.getByUser(userId);
  }
}
