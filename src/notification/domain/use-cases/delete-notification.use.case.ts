import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';

export class DeleteNotification {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<void> {
    await this.repo.notifications.delete(id);
  }
}
