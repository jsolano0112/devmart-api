import { RepositoryContainer } from '../../../shared/infraestructure/respository-container';
import {
  IUserCredentials,
  IUserCredentialsResponse,
} from '../../../shared/interfaces/users';
import { generateToken } from '../../../shared/infraestructure/auth/jwt-service';
import { Exception } from '../../../shared/helpers/exception-message';
import bcrypt from 'bcryptjs';

export class AuthenticateUser {
  constructor(private repo: RepositoryContainer) {}

  async run(user: IUserCredentials): Promise<IUserCredentialsResponse> {
    const existingUser = await this.repo.users.getUserByEmail(user.email);
    if (existingUser == null) throw new Exception('Invalid credentials', 401);

    const isMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!isMatch) throw new Exception('Invalid credentials', 401);

    const tokens = generateToken({
      uuid: existingUser._id.toString(),
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });

    return {
      email: existingUser.email,
      id: existingUser._id.toString(),
      firstname: existingUser.firstName,
      lastname: existingUser.lastName,
      isAdmin: existingUser.isAdmin,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
