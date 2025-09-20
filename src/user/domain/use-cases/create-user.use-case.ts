import { userStatusCode409ExistingUser } from '../models/interfaces/user-response';
import { IUser } from '../models/interfaces/users';
import { UserRepository } from '../repositories/user-repository';

export class CreateUser {
  constructor(private repository: UserRepository) {}

  async run(user: IUser): Promise<void> {
    //TODO: Validate email if exists and the domain
    const existingUser = this.repository.getUserByEmail(user.email);
    if (existingUser) throw userStatusCode409ExistingUser;

    this.repository.createUser(user);
  }
}
