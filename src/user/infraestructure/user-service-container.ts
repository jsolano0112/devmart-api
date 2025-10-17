import { RepositoryContainer } from '../../shared/infraestructure/respository-container';
import { AuthenticateUser } from '../domain/use-cases/authenticate-user.use.case';
import { CreateUser } from '../domain/use-cases/create-user.use-case';
import { GetUserById } from '../domain/use-cases/get-user.use.case';
import { RefreshToken } from '../domain/use-cases/refresh-token.use.case';
import { UpdateUser } from '../domain/use-cases/update-user.use-case';

const repositories = new RepositoryContainer();

export const UserServiceContainer = {
  getUserById: new GetUserById(repositories),
  createUser: new CreateUser(repositories),
  updateUser: new UpdateUser(repositories),
  authenticateUser: new AuthenticateUser(repositories),
  refreshToken: new RefreshToken(repositories),
};
