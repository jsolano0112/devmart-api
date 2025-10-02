import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import {
  userStatusCode409ExistingUser,
  userStatusCode422Password,
} from '../models/interfaces/user-response';
import {
  IUserCredentials,
  IUserCredentialsResponse,
} from '../models/interfaces/users';
import { generateToken } from '../../../shared/infraestructure/auth/jwt-service';

export class AuthenticateUser {
  constructor(private repo: RepositoryContainer) {}

  async run(user: IUserCredentials): Promise<IUserCredentialsResponse> {
    const existingUser = await this.repo.users.getUserByEmail(user.email);

    if (existingUser.password !== user.password)
      throw userStatusCode422Password;

    const token = generateToken({
      uuid: existingUser._id.toString(),
      email: existingUser.email,
      role: existingUser.isAdmin ? 'admin' : 'user',
    });

    return {
      email: existingUser.email,
      id: existingUser._id.toString(),
      token,
    };
  }
}
