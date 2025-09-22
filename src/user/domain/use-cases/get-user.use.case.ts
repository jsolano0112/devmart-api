import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import { IUserResponse } from '../models/interfaces/users';

export class GetUserById {
  constructor(private repo: RepositoryContainer) {}

  async run(id: string): Promise<IUserResponse> {
    return await this.repo.users.getUserById(id);
  }
}
