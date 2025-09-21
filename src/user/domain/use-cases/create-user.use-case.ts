import { validateEmailDomain } from '../../../shared/helpers/email-domain-validator';
import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import {
  userStatusCode409ExistingUser,
} from '../models/interfaces/user-response';
import { IUser } from '../models/interfaces/users';
export class CreateUser {
  constructor(private repo: RepositoryContainer) {}

  async run(user: IUser): Promise<void> {
    const existingUser = await this.repo.users.getUserByEmail(user.email);
    if (existingUser) throw userStatusCode409ExistingUser;
    await validateEmailDomain(user.email);
    this.repo.users.createUser(user);
  }
}
