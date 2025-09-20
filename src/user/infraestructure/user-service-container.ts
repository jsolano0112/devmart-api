import { UserRepository } from '../domain/repositories/user-repository';
import { CreateUser } from '../domain/use-cases/create-user.use-case';
import { GetUserOrders } from '../domain/use-cases/get-user-orders.use.case';
import { GetUserById } from '../domain/use-cases/get-user.use.case';
import { UpdateUser } from '../domain/use-cases/update-user.use-case';

const userRepository = new UserRepository();

export const UserServiceContainer = {
  getUserById: new GetUserById(userRepository),
  createUser: new CreateUser(userRepository),
  updateUser: new UpdateUser(userRepository),
  getUserOrders: new GetUserOrders(userRepository),
};
